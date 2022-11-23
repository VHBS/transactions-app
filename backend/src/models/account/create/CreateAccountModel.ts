import { AccountType } from '../../../@types/account'
import Account from '../../../sequelize/models/Account'
import ICreateAccountModel from './interface/ICreateAccountModel'

export default class CreateAccountModel implements ICreateAccountModel<AccountType> {
  private _accountRepository: typeof Account

  constructor (accountRepository: typeof Account) {
    this._accountRepository = accountRepository
  }

  public execute = async (): Promise<AccountType> => {
    const newAccount = await this._accountRepository.create()

    return newAccount
  }
}
