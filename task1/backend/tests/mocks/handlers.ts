// src/mocks/handlers.js
import { http, HttpResponse, passthrough } from 'msw'
import * as fs from 'fs'
import * as path from 'path'

function searchParamsToPath(searchParams: URLSearchParams) {
  return searchParams.toString() + ".json"
}

type Mocks = {
  [key: string]: string
}

export const handlers = (mocks: Mocks, disableMocks?: boolean) => {
  let mocksResolvers = []
  for (const [key, folderPath] of Object.entries(mocks)) {
    mocksResolvers.push(http.get(key, ({ request }) => {
      if (disableMocks) return passthrough()
      const searchParams = new URL(request.url).searchParams
      return HttpResponse.json(fs.readFileSync(path.resolve(folderPath, searchParamsToPath(searchParams)), 'utf-8'))
    }))
  }
  return mocksResolvers
}