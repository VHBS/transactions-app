import { NextFunction, Request, Response } from 'express'
import { UserServiceType } from '../../../@types/user'
import ILoginUserService from '../../../services/user/login/interface/ILoginUserService'
import ILoginUserController from './interface/ILoginUserController'

export default class LoginUserController implements ILoginUserController<UserServiceType> {
  private _loginUserService: ILoginUserService<UserServiceType>

  constructor (loginUserService: ILoginUserService<UserServiceType>) {
    this._loginUserService = loginUserService
  }

  public execute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<UserServiceType> | void> => {
    try {
      const { userName, password } = req.body

      const loginUserServiceResponse = await this._loginUserService.execute({
        userName,
        password
      })

      return res.status(loginUserServiceResponse.status).json(loginUserServiceResponse.json)
    } catch (error) {
      return next(error)
    }
  }
}
