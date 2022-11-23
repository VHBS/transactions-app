import { NextFunction, Request, Response } from 'express'
import { MessageErrorType } from '../../../../@types/error'

export default interface ICreateUserController<T> {
  execute: (req: Request, res: Response, next: NextFunction) => Promise<Response<T | MessageErrorType> | void>
}
