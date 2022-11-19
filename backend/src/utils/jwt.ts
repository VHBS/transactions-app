import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { UserType } from '../@types/user'

class Jwt {
  private _secret: string

  constructor (secret: string) {
    this._secret = secret
  }

  public sign = (data: UserType) => {
    return jwt.sign({ data }, this._secret, { expiresIn: '24h', algorithm: 'HS256' })
  }

  public verify = (token: string) => {
    return jwt.verify(token, this._secret)
  }
}

const { JWT_SECRET } = process.env

export default new Jwt(JWT_SECRET as string)
