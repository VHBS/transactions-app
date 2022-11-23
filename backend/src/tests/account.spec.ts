import Account from '../sequelize/models/Account'
import CreateAccountModel from '../models/account/create/CreateAccountModel'
import { createAccountModelMock } from './mocks/accountMoks'

describe('Testing Account Model', () => {
  it('Create Account', async () => {
    const createAccountModel = new CreateAccountModel(Account)
    jest.spyOn(Account, 'create').mockResolvedValue(createAccountModelMock as Account)
    const newAccount = await createAccountModel.execute()

    expect(newAccount).toBe(createAccountModelMock)
  })
})
