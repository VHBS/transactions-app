import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import ErrorMiddleware from '../middlewares/error/ErrorMiddleware'

const errorMiddleware = new ErrorMiddleware()

describe('Testing global error middleware', () => {
  const mockError = {} as ErrorRequestHandler
  const mockResponse = {} as Response
  const mockRequest = {} as Request
  const mockNext: NextFunction = jest.fn()

  beforeEach(() => {
    mockResponse.json = jest.fn().mockReturnValue(mockResponse)
    mockResponse.status = jest.fn().mockReturnValue(mockResponse)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Success', async () => {
    await errorMiddleware.execute(mockError, mockRequest, mockResponse, mockNext)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Unexpected server error' })
  })
})
