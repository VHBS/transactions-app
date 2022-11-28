import { NextFunction, Request, Response } from 'express'
import { MessageErrorType } from '../../../@types/error'
import { AuthUserServiceType } from '../../../@types/user'
import ICreateUserService from '../../../services/user/create/interface/ICreateUserService'
import ICreateUserController from './interface/ICreateUserController'

export default class CreateUserController implements ICreateUserController<AuthUserServiceType> {
  private _createUserService: ICreateUserService<AuthUserServiceType>

  constructor (createUserService: ICreateUserService<AuthUserServiceType>) {
    this._createUserService = createUserService
  }

  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<AuthUserServiceType | MessageErrorType> | void> => {
    try {
      const { userName, password } = req.body

      const createUser = await this._createUserService.execute({ userName, password })

      if (!createUser) return res.status(409).json({ message: 'user already exists' })

      return res.status(201).json(createUser)
    } catch (error) {
      return next(error)
    }
  }
}
