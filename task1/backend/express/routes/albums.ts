import { routes } from "./router";
import { searchFromItunes } from "../../utils/itunes";

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
  
  const uniqueAlbums = await searchFromItunes(artist as string, {
    limit: req.query.limit as string,
  });

  res.send(uniqueAlbums);
});
