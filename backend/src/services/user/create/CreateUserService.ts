import { AccountType } from '../../../@types/account'
import { CreateUserServiceType, UserType } from '../../../@types/user'
import ICreateAccountModel from '../../../models/account/create/interface/ICreateAccountModel'
import ICreateUserModel from '../../../models/user/create/interface/ICreateUserModel'
import IFindUserModel from '../../../models/user/findByUserName/interface/IFindUserModel'
import ICreateUserService from './interface/ICreateUserService'
import Jwt from '../../../utils/jwt'
// import { MessageErrorType } from '../../../@types/error'

export default class CreateUserService implements ICreateUserService<CreateUserServiceType> {
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

  public execute = async (userToCreate: UserType): Promise<CreateUserServiceType | null> => {
    const userExists = await this._findUserModel.execute(userToCreate.userName)

    // Fail - User already exists
    if (userExists) return null

    const newAccount = await this._createAccountModel.execute()

    userToCreate.accountId = newAccount.id

    const createdUser = await this._createUserModel.execute(userToCreate)

    const token = Jwt.sign(createdUser)

    // Success - User created
    return {
      token,
      user: createdUser
    }
  }
}
