import { routes } from './router';
import { Api } from '../../utils/itunes/Api';
import { Album } from '../../definitions/types';

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
 *          items: 
 *            $ref: '#/components/schemas/Album'
 */
routes.get('/albums', async (req, res) => {
  let artist = req.query.artist
  console.assert(artist, 'artist query parameter must be a provided');

  let results = await itunes.search.itunesSearch({
    term: artist as string,
    country: '',
    entity: 'album',
    limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
  });
  let albums = await results.json()

  let existingCollectionNames = [] as string[]

  let uniqueAlbums = albums.results.filter((album: Album) => {
    if (existingCollectionNames.includes(album.collectionName)) {
      return false
    } else {
      existingCollectionNames.push(album.collectionName)
      return true
    }
  })

  res.send(uniqueAlbums);
});