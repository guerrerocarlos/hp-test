import { routes } from './router';
import { Api as iTunesApi } from '../../utils/itunes/Api';
import { Album } from '../../definitions/types';

const itunes = new iTunesApi();

/**
 * @openapi
 * /albums:
 *   get:
 *     description: Get artist albums
 *     produces: application/json
 *     parameters:
 *      - name: artist
 *        description: Artist name
 *        in: query
 *      - name: limit
 *        required: false
 *        description: Limit number of albums to return
 *        in: query
 *     responses:
 *       200:
 *         description: albums
 *         schema:
 *          type: array
 *          items: 
 *            $ref: '#/components/schemas/Album'
 */
routes.get('/albums', async (req, res) => {
  let artist = req.query.artist || 'jack johnson';

  let results = await itunes.search.itunesSearch({
    term: artist as string,
    country: 'US',
    entity: 'album',
    limit: req.query.limit ? parseInt(req.query.limit) : undefined
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