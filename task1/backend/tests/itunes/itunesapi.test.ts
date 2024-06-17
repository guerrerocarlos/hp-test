
import * as path from "path"

import { describe, test, expect } from '@jest/globals';
import { Api } from '../../utils/itunes/Api';
import { mswServer } from '../mocks/node';
import { ItunesResults } from "../../utils/itunes/types";
import { searchFromItunesApi } from "../../utils/itunes";

const { server, recording, record } = mswServer({
  record: false,
  mocks: {
    'https://itunes.apple.com/search': path.resolve(__dirname, 'search')
  }
})
server.listen()

describe('iTunesAPI', () => {
  test('Simple Search', async () => {
    let testPayload = {
      term: "Nirvana",
      attribute: "allArtistTerm",
      country: "",
      entity: "album",
    } as any;
    let newSearchParams = new URLSearchParams(testPayload);
    const api = new Api();
    expect(api).toBeInstanceOf(Api);

    const resultFromApi = await searchFromItunesApi(testPayload);

    if (recording) {
      record({
        path: 'https://itunes.apple.com/search',
        searchParams: newSearchParams,
        result: resultFromApi
      })
    }

    expect(resultFromApi).toMatchSnapshot();
  });

  test('Limited search', async () => {
    let testPayload = {
      term: 'michael jackson',
      entity: 'album',
      country: 'US',
      limit: 5
    } as any;
    let newSearchParams = new URLSearchParams(testPayload);
    const api = new Api();
    expect(api).toBeInstanceOf(Api);

    const apiResultPayload = await searchFromItunesApi(testPayload);

    expect(apiResultPayload.resultCount).toEqual(5);
    expect(apiResultPayload.results.length).toEqual(5);


    if (recording) {
      record({
        path: 'https://itunes.apple.com/search',
        searchParams: newSearchParams,
        result: apiResultPayload
      })
    }

    expect(apiResultPayload).toMatchSnapshot();
  });
});