import { Router } from 'express'
import CreateUserFactory from '../factories/user/CreateUserFactory'
import LoginUserFactory from '../factories/user/LoginUserFactory'
import { userDataVerifyMiddleware } from '../factories/user/UserMiddlewares'

const userRoutes = Router()

userRoutes.post(
  '/login',
  userDataVerifyMiddleware.execute,
  LoginUserFactory.execute)

userRoutes.post(
  '/',
  userDataVerifyMiddleware.execute,
  CreateUserFactory.execute)

export default userRoutes
