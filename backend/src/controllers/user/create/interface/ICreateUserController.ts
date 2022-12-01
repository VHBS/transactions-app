import { NextFunction, Request, Response } from 'express'

export default interface ICreateUserController<T> {
  execute: (req: Request, res: Response, next: NextFunction) => Promise<Response<T> | void>
}
