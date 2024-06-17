# Express.js server that accomplishes these tasks:

- Connects to the iTunes Search API: https://tinyurl.com/itunes-search-api 
- Pulls back a list of albums for a specified artist
- Filters the results so there are no duplicate albums (based on album name)
- Serves the filtered results to the front-end via a route

## Implementation:
![Tests Status](https://github.com/guerrerocarlos/hp-test/actions/workflows/backend.yml/badge.svg)

 - **definitions**: Includes all typescript definitions to be shared among the code, the [public.ts][definitions/public.ts] types that can be shared publicly. These types can generate swagger/openapi types using `npm run definitions` and results in [public.ts.json][definitions/public.ts.json] JSON file that is consumed by [swagger.ts](express/openapi/swagger.ts). 
 - **express**: Takes care of all the express.js related logic, including automatic generation of OpenAPI Rest API documentation and public UI service. Each endpoint is documented using OpenAPI standard. Example [albums.ts](express/routes/albums.ts)
 - **utils**: Contains all useful tools that can be required by the business logic, like in this case [itunes](utils/itunes/). Itunes client is generated automatically from available [swagger definition](utils/itunes/itunesapi.swagger.json) and re-generated or updated using `npm run itunesapi`
 - **tests**: Keeps all unit-tests and mocks required to do test-driven-development even without access to internet. [MSW](https://mswjs.io/) was used to record network requests and be able to replay inside tests.

# Local development:

## Install dependencies:

```yarn install```

## Run locally using `tsx`

```npm run dev```

# Serverless

Additionally the service can be deployed to AWS Lambda using the serverless framework and can be tested locally using:

```serverless offline --stage api```