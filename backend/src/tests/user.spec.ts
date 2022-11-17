import User from '../sequelize/models/User'
import CreateUserModel from '../models/user/create/CreateUserModel'
import { createUserModelMock, inputCreateUserModelMock } from './mocks/userMocks'

describe('Testing User Model', () => {
  it('Create User', async () => {
    const createUserModel = new CreateUserModel(User)
    jest.spyOn(User, 'create').mockResolvedValue(createUserModelMock as User)
    const newUser = await createUserModel.execute(inputCreateUserModelMock)

    expect(newUser).toBe(createUserModelMock.getData)
  })
})
