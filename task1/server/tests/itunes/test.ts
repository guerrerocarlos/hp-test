
import * as path from "path"
import { Api } from '../../utils/itunes/Api';

import { mswServer } from '../mocks/node';

const { server, recording, record } = mswServer({
  record: false,
  mocks: {
    'https://itunes.apple.com/search': path.resolve(__dirname, 'search')
  }
})
server.listen()

describe('sum module', () => {
  let testPayload = {
    term: 'jack johnson',
    country: 'US'
  }
  let newSearchParams = new URLSearchParams(testPayload);
  test('adds 1 + 2 to equal 3', async () => {
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