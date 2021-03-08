import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBeFalsy()
  })

  test('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()

    const isValid = sut.isValid('valid_email@mail.com')

    expect(isValid).toBeTruthy()
  })

  test('Should call validator with correct value', () => {
    const sut = new EmailValidatorAdapter()
    const input = 'valid_email@mail.com'

    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid(input)

    expect(isEmailSpy).toHaveBeenCalledWith(input)
  })
})
