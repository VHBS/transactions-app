import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { MessageErrorType } from '../../../@types/error'

export default interface IErrorMiddleware {
  execute: (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction) => Promise<Response<MessageErrorType>>
}
