/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { MessageErrorType } from '../../@types/error'
import IErrorMiddleware from './interface/IErrorMiddleware'

export default class ErrorMiddleware implements IErrorMiddleware {
  public execute = async (
    err: ErrorRequestHandler,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response<MessageErrorType>> => {
    console.log(err)
    return res.status(500).json({ message: 'Unexpected server error' })
  }
}
