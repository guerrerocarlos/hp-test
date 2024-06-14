
import * as path from "path"

import { describe, test, expect } from '@jest/globals';
import { Api } from '../../utils/itunes/Api';
import { mswServer } from '../mocks/node';

const { server, recording, record } = mswServer({
  record: true,
  mocks: {
    'https://itunes.apple.com/search': path.resolve(__dirname, 'search')
  }
})
server.listen()

describe('iTunesAPI', () => {
  test('Simple Search', async () => {
    let testPayload = {
      term: 'michael jackson',
      entity: 'album',
      country: 'US'
    }
    let newSearchParams = new URLSearchParams(testPayload);
    const api = new Api();
    expect(api).toBeInstanceOf(Api);

    const apiResultPayload = await api.search.itunesSearch(testPayload);
    const resultFromApi = await apiResultPayload.json();

    if (recording) {
      record({
        path: 'https://itunes.apple.com/search',
        searchParams: newSearchParams,
        result: resultFromApi
      })
    }

    expect(resultFromApi).toMatchSnapshot();
  });
});