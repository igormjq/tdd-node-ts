import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getColletion('accounts')

    const result = await accountCollection.insertOne(accountData)

    const [accountCreated] = result.ops

    const { _id: id, ...account } = accountCreated

    return Object.assign({}, account, { id })
  }
}
