import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hashed_value'
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()

    const spyOnBcryptHash = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(spyOnBcryptHash).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hashed value on success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hashed_value')
  })
})
