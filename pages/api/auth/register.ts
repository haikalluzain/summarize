import { UserModel } from 'models/User'
import { NextApiResponse } from 'next'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import { generateHash } from 'utils/password'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  responseUnprocessable,
  successResponse,
} from 'utils/response'
import { validate, validationError } from 'utils/validation'
import * as Yup from 'yup'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    req = await nextMiddleware(req, res)

    if (req.method !== 'POST') {
      return responseMethodNotAllowed(res)
    }

    if (req.user !== null) {
      return successResponse(res, 'User already logged in')
    }

    try {
      await validate(req, {
        name: Yup.string().required().min(3),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8),
      })
    } catch (e) {
      return validationError(e, res)
    }

    const { name, email, password } = req.body

    if (await UserModel.isEmailTaken(email)) {
      return responseUnprocessable(
        res,
        'This email is already registered',
        'email'
      )
    }

    const pass = await generateHash(password)

    const user = await UserModel.create({
      email: email.toLowerCase(),
      name,
      password: pass,
    })

    return successResponse(res, 'Successfully registered the user', user)
  } catch (e) {
    console.log(e)
    return responseInternalServerError(res)
  }
}
