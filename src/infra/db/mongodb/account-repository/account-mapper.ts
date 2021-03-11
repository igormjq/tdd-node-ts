import { AccountModel } from '../../../../domain/models/account'

export const map = (account: any): AccountModel => {
  const { _id: id, ...data } = account

  return Object.assign({}, data, { id })
}
