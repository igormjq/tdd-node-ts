import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  beforeEach(async () => await MongoHelper.clear('accounts'))

  afterAll(async () => await MongoHelper.disconnect())
  test('Should an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(201)
  })
})
