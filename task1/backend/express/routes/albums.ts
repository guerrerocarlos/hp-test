import { routes } from "./router";
import { Api } from "../../utils/itunes/Api";
import { Album } from "../../definitions/public";

const itunes = new Api();

/**
 * @openapi
 * /albums:
 *   get:
 *     description: Get artist albums
 *     produces: application/json
 *     parameters:
 *      - name: artist
 *        required: true
 *        description: Artist name
 *        in: query
 *      - name: limit
 *        required: false
 *        description: Limit number of albums to return
 *        in: query
 *     responses:
 *       200:
 *         description: Albums Array
 *         schema:
 *          type: array
 *          schema:
 *            $ref: '#/components/schemas/Album'
 *       400:
 *         description: Invalid Search
 */
routes.get("/albums", async (req, res) => {
  let artist = req.query.artist;
  console.assert(artist, "artist query parameter must be a provided");

  let results = await itunes.search.itunesSearch({
    term: artist as string,
    attribute: "allArtistTerm",
    country: "",
    entity: "album",
  });

  let albums = await results.json();

  let existingCollectionNames = [] as string[];

  let uniqueAlbums = [] as Album[];
  for (let album of albums.results) {
    if (!existingCollectionNames.includes(album.collectionName)) {
      existingCollectionNames.push(album.collectionName);
      uniqueAlbums.push(album);
      if(req.query.limit && parseInt(req.query.limit as string)) {
        if(uniqueAlbums.length === parseInt(req.query.limit as string)) {
          break;
        }
      }
    }
  }

  res.send(uniqueAlbums);
});
