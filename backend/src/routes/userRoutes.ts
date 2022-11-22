import { Router } from 'express'
import CreateUserFactory, { createUserMiddleware } from '../factories/user/CreateUserFactory'

const userRoutes = Router()

userRoutes.post('/', createUserMiddleware.execute, CreateUserFactory.execute)

export default userRoutes
