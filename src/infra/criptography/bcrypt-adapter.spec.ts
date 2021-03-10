import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const spyOnBcryptHash = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(spyOnBcryptHash).toHaveBeenCalledWith('any_value', salt)
  })
})
