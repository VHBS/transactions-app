import { NextFunction, Request, Response } from 'express'
import { CreateUserServiceType } from '../../../@types/user'
import ICreateUserService from '../../../services/user/create/interface/ICreateUserService'
import ICreateUserController from './interface/ICreateUserController'

export default class CreateUserController implements ICreateUserController<CreateUserServiceType> {
  private _createUserService: ICreateUserService<CreateUserServiceType>

  constructor (createUserService: ICreateUserService<CreateUserServiceType>) {
    this._createUserService = createUserService
  }

  public execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, password } = req.body

      const createUser = await this._createUserService.execute({ userName, password })

      if (!createUser) return res.status(409).json({ message: 'User already exists' })

      return res.status(201).json(createUser)
    } catch (error) {
      return next(error)
    }
  }
}
