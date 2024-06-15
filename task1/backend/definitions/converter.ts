import * as fs from "fs";
import * as path from "path";
import { getTypeScriptReader, getOpenApiWriter, makeConverter } from "typeconv";
import { name, version } from "../package.json";

async function generateSchemas(schemasPath: string) {
  const reader = getTypeScriptReader();
  const writer = getOpenApiWriter({
    format: "json",
    title: name || process.env.NAME || "",
    version: version || process.env.VERSION || "",
  });
  const { convert } = makeConverter(reader, writer);
  const dataFromTypes = fs.readFileSync(
    path.resolve(__dirname, schemasPath),
    "utf8"
  );

  const { data } = await convert({ data: dataFromTypes });
  const dataObject = JSON.parse(data);
  fs.writeFileSync(
    path.resolve(__dirname, schemasPath + ".json"),
    JSON.stringify(dataObject, null, 2)
  );
  return dataObject;
}

generateSchemas("./public.ts");
