import * as fs from "fs"
import { name, version } from '../../package.json';
import {
  getTypeScriptReader,
  getOpenApiWriter,
  makeConverter,
} from 'typeconv'

export async function generateSchemas() {
  const reader = getTypeScriptReader();
  const writer = getOpenApiWriter({ format: 'json', title: name, version: version });
  const { convert } = makeConverter(reader, writer);
  const dataFromTypes = fs.readFileSync("./definitions/types.ts", 'utf8');

  const { data } = await convert({ data: dataFromTypes });
  const dataObject = JSON.parse(data)
  return dataObject
}

