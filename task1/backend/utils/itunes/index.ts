import { Api } from "../../utils/itunes/Api";
import { Album } from "../../definitions/public";

const itunes = new Api();

type ItunesSearchPayload = {
  term: string;
  attribute: string;
  country: string;
  entity: string;
};

type ItunesSearchResponse = {
  resultCount: number;
  results: Album[];
};

export async function searchFromItunes(
  artist: string,
  opts?: { limit?: string }
) {
  let existingCollectionNames = [] as string[];
  let uniqueAlbums = [] as Album[];

  let results = await itunes.search.itunesSearch({
    term: artist as string,
    attribute: "allArtistTerm",
    country: "",
    entity: "album",
  });

  let albums = await results.json();

  if(typeof albums === 'string') {
    albums = JSON.parse(albums);
  }

  for (let album of albums.results) {
    if (!existingCollectionNames.includes(album.collectionName)) {
      existingCollectionNames.push(album.collectionName);
      uniqueAlbums.push(album);
      if (opts?.limit && parseInt(opts?.limit)) {
        if (uniqueAlbums.length === parseInt(opts.limit)) {
          break;
        }
      }
    }
  }

  return uniqueAlbums;
}

export async function searchFromItunesApi(payload: ItunesSearchPayload) {
  let resultsPayload = await itunes.search.itunesSearch(payload as any);

  let results = await resultsPayload.json();

  if(typeof results === 'string') {
    results = JSON.parse(results);
  }

  return results as ItunesSearchResponse;
}