import Account from '../../../sequelize/models/Account'

export default class CreateAccountModel {
  private _accountRepository: typeof Account

  constructor (accountRepository: typeof Account) {
    this._accountRepository = accountRepository
  }

  public execute = async () => {
    const newAccount = await this._accountRepository.create()

    return newAccount
  }
}
