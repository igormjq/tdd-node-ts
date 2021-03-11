import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

const makeSut = (): AccountMongoRepository => new AccountMongoRepository()

describe('Account Mongo Repository', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  test('Should return an account on success', async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_hashed_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()

    expect(account).toMatchObject({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_hashed_password'
    })
  })
})
