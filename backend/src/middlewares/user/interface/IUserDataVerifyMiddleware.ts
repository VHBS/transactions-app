import { NextFunction, Request, Response } from 'express'
import { MessageErrorType } from '../../../@types/error'

export default interface IUserDataVerifyMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => Promise<Response<MessageErrorType> | void>
}
