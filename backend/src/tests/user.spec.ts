import User from '../sequelize/models/User'
import CreateUserModel from '../models/user/create/CreateUserModel'
import { createUserModelMock, findUserModelMock, inputCreateUserMock, tokenMock, userAlreadyExistMessageMock } from './mocks/userMocks'
import FindUserModel from '../models/user/findByUserName/FindUserModel'
import CreateUserService from '../services/user/create/CreateUserService'
import CreateAccountModel from '../models/account/create/CreateAccountModel'
import Account from '../sequelize/models/Account'
import { createAccountModelMock } from './mocks/accountMoks'
import Jwt from '../utils/jwt'
import { NextFunction, Request, Response } from 'express'
import CreateUserController from '../controllers/user/create/CreateUserController'
import CreateUserMiddleware from '../middlewares/user/CreateUserMiddleware'

// Models
const createAccountModel = new CreateAccountModel(Account)
const createUserModel = new CreateUserModel(User)
const findUserModel = new FindUserModel(User)

// Services
const createUserService = new CreateUserService(
  findUserModel,
  createUserModel,
  createAccountModel)

// Controllers
const createUserController = new CreateUserController(createUserService)

// Middlewares
const createUserMiddleware = new CreateUserMiddleware()
describe('Testing user model', () => {
  describe('Create user', () => {
    it('Success', async () => {
      jest.spyOn(User, 'create').mockResolvedValue(createUserModelMock as User)
      const newUser = await createUserModel.execute(inputCreateUserMock)

      expect(newUser).toStrictEqual(createUserModelMock.getData)
    })
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
      jest.spyOn(Jwt, 'sign').mockReturnValue(tokenMock)

      const newUser = await createUserService.execute(inputCreateUserMock)

      expect(newUser).toStrictEqual({ token: tokenMock, user: createUserModelMock.getData })
    })
    it('Fail - User already exists', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(findUserModelMock as User)
      const newUser = await createUserService.execute(inputCreateUserMock)

      expect(newUser).toStrictEqual(null)
    })
  })
})

describe('Testing user controller', () => {
  const mockResponse = {} as Response
  const mockNext: NextFunction = jest.fn()
  const mockRequest = {
    body: inputCreateUserMock
  } as Request

  beforeEach(() => {
    mockResponse.json = jest.fn().mockReturnValue(mockResponse)
    mockResponse.status = jest.fn().mockReturnValue(mockResponse)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Create User', () => {
    it('Success', async () => {
      jest.spyOn(createUserService, 'execute')
        .mockResolvedValue({ token: tokenMock, user: createUserModelMock.getData })
      await createUserController.execute(mockRequest, mockResponse, mockNext)

      expect(mockNext).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalledTimes(0)
      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(mockResponse.json).toHaveBeenCalledWith({ token: tokenMock, user: createUserModelMock.getData })
    })
    it('Fail - User already exists', async () => {
      jest.spyOn(createUserService, 'execute')
        .mockResolvedValue(null)
      await createUserController.execute(mockRequest, mockResponse, mockNext)

      expect(mockNext).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalledTimes(0)
      expect(mockResponse.status).toHaveBeenCalledWith(409)
      expect(mockResponse.json).toHaveBeenCalledWith(userAlreadyExistMessageMock)
    })
    it('Error - Unexpected server error', async () => {
      jest.spyOn(createUserService, 'execute')
        .mockRejectedValue(new Error())
      await createUserController.execute(mockRequest, mockResponse, mockNext)

      expect(mockNext).toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalledTimes(1)
    })
  })
})

describe('Testing user middleware', () => {
  const mockResponse = {} as Response
  const mockNext: NextFunction = jest.fn()

  beforeEach(() => {
    mockResponse.json = jest.fn().mockReturnValue(mockResponse)
    mockResponse.status = jest.fn().mockReturnValue(mockResponse)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Create User', () => {
    it('Success', async () => {
      await createUserMiddleware.execute({
        body: inputCreateUserMock
      } as Request,
      mockResponse,
      mockNext)

      expect(mockNext).toHaveBeenCalled()
    })
    it('Fail - userName is required', async () => {
      await createUserMiddleware.execute({
        body: {
          userName: '',
          password: inputCreateUserMock.password
        }
      } as Request, mockResponse, mockNext)

      expect(mockNext).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalledTimes(0)
      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'userName is required' })
    })
    it('Fail - userName needs 3 character or more', async () => {
      await createUserMiddleware.execute({
        body: {
          userName: 'Ai',
          password: inputCreateUserMock.password
        }
      } as Request, mockResponse, mockNext)

      expect(mockNext).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalledTimes(0)
      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'userName needs 3 character or more' })
    })
    it('Fail - password is required', async () => {
      await createUserMiddleware.execute({
        body: {
          userName: 'Airton',
          password: ''
        }
      } as Request, mockResponse, mockNext)

      expect(mockNext).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalledTimes(0)
      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'password is required' })
    })
    it('Fail - password must have 8 or more characters', async () => {
      await createUserMiddleware.execute({
        body: {
          userName: 'Airton',
          password: 'Ai12'
        }
      } as Request, mockResponse, mockNext)

      expect(mockNext).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalledTimes(0)
      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'password must have 8 or more characters' })
    })
    it('Fail - password must have numbers', async () => {
      await createUserMiddleware.execute({
        body: {
          userName: 'Airton',
          password: 'AirtonAirton'
        }
      } as Request, mockResponse, mockNext)

      expect(mockNext).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalledTimes(0)
      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'password must have numbers' })
    })
    it('Fail - password must have uppercase letters', async () => {
      await createUserMiddleware.execute({
        body: {
          userName: 'Airton',
          password: 'airton123456'
        }
      } as Request, mockResponse, mockNext)

      expect(mockNext).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalledTimes(0)
      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'password must have uppercase letters' })
    })
    it('Fail - password must have lowercase letters', async () => {
      await createUserMiddleware.execute({
        body: {
          userName: 'Airton',
          password: 'AIRTON123456'
        }
      } as Request, mockResponse, mockNext)

      expect(mockNext).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalledTimes(0)
      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'password must have lowercase letters' })
    })
  })
})
