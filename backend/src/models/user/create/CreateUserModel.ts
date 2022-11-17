import { UserType } from '../../../@types/user'
import User from '../../../sequelize/models/User'

export default class CreateUserModel {
  private _userRepository: typeof User

  constructor (userRepository: typeof User) {
    this._userRepository = userRepository
  }

  public execute = async (user: UserType) => {
    const newUser = await this._userRepository.create(user)

    return newUser.getData
  }
}
