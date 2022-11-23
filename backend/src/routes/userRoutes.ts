import { Router } from 'express'
import CreateUserFactory, { userDataVerifyMiddleware } from '../factories/user/CreateUserFactory'

const userRoutes = Router()

userRoutes.post('/', userDataVerifyMiddleware.execute, CreateUserFactory.execute)

export default userRoutes
