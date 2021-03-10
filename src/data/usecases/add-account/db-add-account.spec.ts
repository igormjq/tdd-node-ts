import { Encrypter } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (password: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const accountData = {
      name: 'valid name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    const accountData = {
      name: 'valid name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    jest.spyOn(encrypterStub, 'encrypt')
      .mockImplementationOnce(async () => {
        return await Promise.reject(new Error())
      })

    const promised = sut.add(accountData)

    await expect(promised).rejects.toThrow()
  })
})
