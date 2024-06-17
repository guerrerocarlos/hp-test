import * as path from "path";

import { describe, test, expect } from "@jest/globals";
import { searchFromItunes } from "../../utils/itunes";
import { mswServer } from "../mocks/node";

const { server } = mswServer({
  record: false,
  mocks: {
    "https://itunes.apple.com/search": path.resolve(__dirname, "search"),
  },
});
server.listen();

describe("REST API", () => {
  test("Search artist", async () => {
    const jsonResponse = await searchFromItunes("Nirvana");
    expect(jsonResponse).toBeInstanceOf(Array);
    expect(jsonResponse.length).toBeGreaterThan(0);
  });
});
