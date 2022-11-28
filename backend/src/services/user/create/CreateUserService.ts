import { AccountType } from '../../../@types/account'
import { AuthUserServiceType, UserType } from '../../../@types/user'
import ICreateAccountModel from '../../../models/account/create/interface/ICreateAccountModel'
import ICreateUserModel from '../../../models/user/create/interface/ICreateUserModel'
import IFindUserModel from '../../../models/user/findByUserName/interface/IFindUserModel'
import ICreateUserService from './interface/ICreateUserService'
import Jwt from '../../../utils/jwt'

export default class CreateUserService implements ICreateUserService<AuthUserServiceType> {
  private _createUserModel: ICreateUserModel<UserType>
  private _findUserModel: IFindUserModel<UserType>
  private _createAccountModel: ICreateAccountModel<AccountType>

  constructor (
    findUserModel: IFindUserModel<UserType>,
    createUserModel: ICreateUserModel<UserType>,
    createAccountModel: ICreateAccountModel<AccountType>
  ) {
    this._findUserModel = findUserModel
    this._createUserModel = createUserModel
    this._createAccountModel = createAccountModel
  }

  public execute = async (userToCreate: UserType): Promise<AuthUserServiceType | null> => {
    const userExists = await this._findUserModel.execute(userToCreate.userName)

    if (userExists) return null

    const newAccount = await this._createAccountModel.execute()
    userToCreate.accountId = newAccount.id

    const createdUser = await this._createUserModel.execute(userToCreate)
    createdUser.account = newAccount

    const token = Jwt.sign(createdUser)

    return {
      token,
      user: createdUser
    }
  }
}
