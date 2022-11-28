import { NextFunction, Request, Response } from 'express'
import { MessageErrorType } from '../../../@types/error'
import { AuthUserServiceType, UserServiceType } from '../../../@types/user'
import ICreateUserService from '../../../services/user/create/interface/ICreateUserService'
import ICreateUserController from './interface/ICreateUserController'

export default class CreateUserController implements ICreateUserController<AuthUserServiceType> {
  private _createUserService: ICreateUserService<UserServiceType>

  constructor (createUserService: ICreateUserService<UserServiceType>) {
    this._createUserService = createUserService
  }

  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<AuthUserServiceType | MessageErrorType> | void> => {
    try {
      const { userName, password } = req.body

      const createUserServiceResponse = await this._createUserService.execute({
        userName,
        password
      })

      return res.status(createUserServiceResponse.status).json(createUserServiceResponse.json)
    } catch (error) {
      return next(error)
    }
  }
}
