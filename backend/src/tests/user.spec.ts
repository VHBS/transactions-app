import User from '../sequelize/models/User'
import CreateUserModel from '../models/user/create/CreateUserModel'
import { createUserModelMock, findUserModelMock, inputCreateUserModelMock } from './mocks/userMocks'
import FindUserModel from '../models/user/findByUserName/FindUserModel'

describe('Testing User Model', () => {
  it('Create User', async () => {
    const createUserModel = new CreateUserModel(User)
    jest.spyOn(User, 'create').mockResolvedValue(createUserModelMock as User)
    const newUser = await createUserModel.execute(inputCreateUserModelMock)

    expect(newUser).toBe(createUserModelMock.getData)
  })

  describe('Find User', () => {
    it('Success', async () => {
      const findUserModel = new FindUserModel(User)
      jest.spyOn(User, 'findOne').mockResolvedValue(findUserModelMock as User)
      const findedUser = await findUserModel.execute('Airton')

      expect(findedUser).toBe(findUserModelMock)
    })

    it('Fail', async () => {
      const findUserModel = new FindUserModel(User)
      jest.spyOn(User, 'findOne').mockResolvedValue(null)
      const notFindedUser = await findUserModel.execute('Etevaldo')

      expect(notFindedUser).toBe(null)
      expect(notFindedUser).not.toBe(createUserModelMock.getData)
    })
  })
})
