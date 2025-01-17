import { Express } from 'express'
import { bodyParser, cors } from '../middlewares'

export default (app: Express): void => {
  app
    .use(bodyParser)
    .use(cors)
}
