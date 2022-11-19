import User from '../sequelize/models/User'
import CreateUserModel from '../models/user/create/CreateUserModel'
import { createUserModelMock, findUserModelMock, inputCreateUserModelMock } from './mocks/userMocks'
import FindUserModel from '../models/user/findByUserName/FindUserModel'
import CreateUserService from '../services/user/create/CreateUserService'
import CreateAccountModel from '../models/account/create/CreateAccountModel'
import Account from '../sequelize/models/Account'
import { createAccountModelMock } from './mocks/accountMoks'
import Jwt from '../utils/jwt'

const createAccountModel = new CreateAccountModel(Account)

const createUserModel = new CreateUserModel(User)
const findUserModel = new FindUserModel(User)
const createUserService = new CreateUserService(
  findUserModel,
  createUserModel,
  createAccountModel)

describe('Testing user model', () => {
  it('Create user', async () => {
    jest.spyOn(User, 'create').mockResolvedValue(createUserModelMock as User)
    const newUser = await createUserModel.execute(inputCreateUserModelMock)

    expect(newUser).toStrictEqual(createUserModelMock.getData)
  })

  describe('Find user', () => {
    it('Success', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(findUserModelMock as User)
      const findedUser = await findUserModel.execute('Airton')

      expect(findedUser).toStrictEqual(findUserModelMock)
    })

    it('Fail', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null)
      const notFindedUser = await findUserModel.execute('Etevaldo')

      expect(notFindedUser).toBe(null)
      expect(notFindedUser).not.toBe(createUserModelMock.getData)
    })
  })
})

describe('Testing user service', () => {
  describe('Create User', () => {
    it('Success', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null)
      jest.spyOn(Account, 'create').mockResolvedValue(createAccountModelMock as Account)
      jest.spyOn(User, 'create').mockResolvedValue(createUserModelMock as User)
      jest.spyOn(Jwt, 'sign').mockReturnValue('tokenMock')

      const newUser = await createUserService.execute(inputCreateUserModelMock)

      expect(newUser).toStrictEqual({ token: 'tokenMock', user: createUserModelMock.getData })
    })
    it('Fail - User already exists', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(findUserModelMock as User)
      const newUser = await createUserService.execute(inputCreateUserModelMock)

      expect(newUser).toStrictEqual(null)
    })
  })
})
