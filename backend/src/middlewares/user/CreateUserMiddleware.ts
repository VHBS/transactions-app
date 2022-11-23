import { NextFunction, Request, Response } from 'express'
import ICreateUserMiddleware from './interface/ICreateUserMiddleware'

export default class CreateUserMiddleware implements ICreateUserMiddleware {
  private _passwordValidateLowerCase: RegExp = /(?=[a-z])/
  private _passwordValidateUpperCase: RegExp = /(?=[A-Z])/
  private _passwordValidateNumber: RegExp = /(?=[0-9])/
  private _passwordValidateEigthChar: RegExp = /(?=.{8,})/

  public execute = async (req: Request, res: Response, next: NextFunction) => {
    const { userName, password } = req.body

    if (!userName) return res.status(400).json({ message: 'userName is required' })

    if (userName.length < 3) {
      return res.status(400).json({ message: 'userName needs 3 character or more' })
    }

    if (!password) return res.status(400).json({ message: 'password is required' })

    if (!this._passwordValidateEigthChar.test(password)) {
      return res.status(400).json({ message: 'password must have 8 or more characters' })
    }
    if (!this._passwordValidateNumber.test(password)) {
      return res.status(400).json({ message: 'password must have numbers' })
    }
    if (!this._passwordValidateUpperCase.test(password)) {
      return res.status(400).json({ message: 'password must have uppercase letters' })
    }
    if (!this._passwordValidateLowerCase.test(password)) {
      return res.status(400).json({ message: 'password must have lowercase letters' })
    }

    return next()
  }
}
