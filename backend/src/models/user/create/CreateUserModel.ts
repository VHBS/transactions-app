import { UserType } from '../../../@types/user'
import User from '../../../sequelize/models/User'
import ICreateUserModel from './interface/ICreateUserModel'

export default class CreateUserModel implements ICreateUserModel<UserType> {
  private _userRepository: typeof User

  constructor (userRepository: typeof User) {
    this._userRepository = userRepository
  }

  public execute = async (user: UserType): Promise<UserType> => {
    const newUser = await this._userRepository.create(user)

    return newUser.getData
  }
}
