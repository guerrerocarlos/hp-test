import * as fs from "fs"
import {
  getTypeScriptReader,
  getOpenApiWriter,
  makeConverter,
} from 'typeconv'

import { name, version } from '../../package.json';

export async function generateSchemas(schemasPath: string) {
  const reader = getTypeScriptReader();
  const writer = getOpenApiWriter({ format: 'json', title: name, version: version });
  const { convert } = makeConverter(reader, writer);
  const dataFromTypes = fs.readFileSync(schemasPath, 'utf8');

  const { data } = await convert({ data: dataFromTypes });
  const dataObject = JSON.parse(data)
  return dataObject
}

