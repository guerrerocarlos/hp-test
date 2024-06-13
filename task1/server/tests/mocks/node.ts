import { SetupServerApi, setupServer } from 'msw/node'
import { handlers } from './handlers'
import * as fs from "fs"
import * as path from "path"

type RecorderParams = { path: string, searchParams: URLSearchParams, result: any }

type MswServer = {
  server: SetupServerApi
  recording: boolean
  record: (params: RecorderParams) => void
}

export const mswServer = function (options: { record: boolean, mocks: { [key: string]: string } }): MswServer {
  let mswServer = { server: setupServer(...handlers(options.mocks, options.record)), recording: options.record } as MswServer

  function record(params: RecorderParams) {
    fs.writeFileSync(path.resolve(options.mocks[params.path], params.searchParams.toString() + ".json"), JSON.stringify(params.result, null, 2))
  }

  return { ...mswServer, record }
}
