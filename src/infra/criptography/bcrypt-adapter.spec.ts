import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hashed_value'
  }
}))

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const spyOnBcryptHash = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(spyOnBcryptHash).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hashed value on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hashed_value')
  })
})
