import serverlessExpress from '@codegenie/serverless-express'
import { App } from './express/app';

exports.handler = serverlessExpress({ app: App() })