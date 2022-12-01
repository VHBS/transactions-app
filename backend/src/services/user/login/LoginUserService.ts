import { UserServiceType, UserType } from '../../../@types/user'
import IFindUserModel from '../../../models/user/findByUserName/interface/IFindUserModel'
import User from '../../../sequelize/models/User'
import jwt from '../../../utils/jwt'
import ILoginUserService from './interface/ILoginUserService'

export default class LoginUserService implements ILoginUserService<UserServiceType> {
  private _findUserModel: IFindUserModel<User>

  constructor (
    findUserModel: IFindUserModel<User>
  ) {
    this._findUserModel = findUserModel
  }

  public execute = async (user: UserType) => {
    const userExists = await this._findUserModel.execute(user.userName)

    if (!userExists) {
      return { status: 404, json: { message: 'user not exists' } }
    }

    if (!userExists.validPassword(user.password as string)) {
      return { status: 409, json: { message: 'invalid password ' } }
    }

    const token = jwt.sign(userExists)

    return {
      status: 200,
      json: {
        token,
        user: userExists
      }
    }
  }
}
