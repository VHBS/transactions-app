import Account from '../../../sequelize/models/Account'
import User from '../../../sequelize/models/User'
import IFindUserModel from './interface/IFindUserModel'

export default class FindUserModel implements IFindUserModel<User> {
  private _userRepository: typeof User

  constructor (userRepository: typeof User) {
    this._userRepository = userRepository
  }

  public execute = async (userName: string): Promise<User | null> => {
    const user = await this._userRepository.findOne({
      where: { userName },
      include: [
        {
          model: Account,
          as: 'account'
        }
      ]
    })

    return user
  }
}
