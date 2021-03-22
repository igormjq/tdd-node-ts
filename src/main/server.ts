import app from './config/app'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
MongoHelper.connect(env.mongoUrl)
  .then(() => {
    app.listen(env.port, () => console.log(`Server up and running at http://localhost:${env.port}`))
  })
