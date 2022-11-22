import { NextFunction, Request, Response } from 'express'
import { MessageErrorType } from '../../../@types/error'

export default interface ICreateUserMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => Promise<Response<MessageErrorType> | void>
}
