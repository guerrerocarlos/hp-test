import { Api } from '../Api';
import *  as nock from 'nock';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', async () => {
    const api = new Api();
    expect(api).toBeInstanceOf(Api);
    nock.recorder.rec({
      output_objects: true,
    })
    // ... some HTTP calls

    const apiResultPayload = await api.search.itunesSearch({
      term: 'jack johnson',
      country: 'US'
    });

    const apiResultObject = await apiResultPayload.json();

    expect(apiResultObject).toMatchSnapshot();
    const nockCallObjects = nock.recorder.play()
    expect(nockCallObjects).toMatchSnapshot();

  });
});