import {NextApiResponse} from 'next'
import {ReasonPhrases, StatusCodes} from 'http-status-codes'

/**
 * Success response
 * @param res
 * @param message
 * @param data
 * @param statusCode
 */
export const successResponse = (res: NextApiResponse, message: string, data: any = null, statusCode: number = StatusCodes.OK) => {
  let response = {
    statusCode,
    message,
    data
  }
  if (!data) delete response['data']

  return res.status(statusCode).json(response)
}

/**
 * Error response
 * @param res
 * @param statusCode
 * @param message
 */
export const errorResponse = (res: NextApiResponse, statusCode: number, message: string) => {
  return res.status(statusCode).json({
    statusCode,
    message
  })
}

export const responseNotFound = (
  res: NextApiResponse,
  message: string = ReasonPhrases.NOT_FOUND
) => {
  return errorResponse(res, StatusCodes.NOT_FOUND, message)
}

export const responseUnauthorized = (res: NextApiResponse) => {
  return errorResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
}

export const responseUnprocessable = (
  res: NextApiResponse,
  message: string = ReasonPhrases.UNPROCESSABLE_ENTITY
) => {
  return errorResponse(res, StatusCodes.UNPROCESSABLE_ENTITY, message)
}

export const responseBadRequest = (
  res: NextApiResponse,
  message: string = ReasonPhrases.BAD_REQUEST
) => {
  return errorResponse(res, StatusCodes.BAD_REQUEST, message)
}

export const responseInternalServerError = (
  res: NextApiResponse,
  message: string = ReasonPhrases.INTERNAL_SERVER_ERROR
) => {
  return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, message)
}

export const responseMethodNotAllowed = (res: NextApiResponse) => {
  return errorResponse(res, StatusCodes.METHOD_NOT_ALLOWED, ReasonPhrases.METHOD_NOT_ALLOWED)
}
