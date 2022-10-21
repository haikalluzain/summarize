import {NextApiRequest, NextApiResponse} from "next"
import {ReasonPhrases, StatusCodes} from "http-status-codes"
import * as Yup from "yup"
import {ObjectShape} from "yup/lib/object"

/**
 *
 * @param req
 * @param payload
 */
export const validate = (
  req: NextApiRequest,
  payload: ObjectShape
) => {
  const body = typeof req.body === 'object' ? req.body : {}
  return Yup.object().shape(payload).validate(body, {abortEarly: false})
}

/**
 *
 * @param error
 * @param res
 */
export const validationError = (error: any, res: NextApiResponse) => {
  const errors: any = {}
  error.inner.forEach((item: any) => {
    errors[item.path] = item.message
  })

  return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
    message: ReasonPhrases.UNPROCESSABLE_ENTITY,
    errors
  })
}
