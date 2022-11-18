import { UserType } from '../../../@types/user'
import Account from '../../../sequelize/models/Account'
import User from '../../../sequelize/models/User'
import IFindUserModel from './interface/IFindUserModel'

export default class FindUserModel implements IFindUserModel<UserType> {
  private _userRepository: typeof User

  constructor (userRepository: typeof User) {
    this._userRepository = userRepository
  }

  public execute = async (userName: string): Promise<UserType | null> => {
    const newUser = await this._userRepository.findOne({
      where: { userName },
      include: [
        {
          model: Account,
          as: 'account'
        }
      ]
    })

    return newUser
  }
}
