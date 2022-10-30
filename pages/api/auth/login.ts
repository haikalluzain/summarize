import { UserModel } from 'models/User'
import { NextApiResponse } from 'next'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  responseNotFound,
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
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })
    } catch (e) {
      return validationError(e, res)
    }

    const { email, password } = req.body

    const user = await UserModel.findOne({ email }).select('+password')
    if (!user) {
      return responseNotFound(res, 'The email is not in our record')
    }

    if (await user.isPasswordMatch(password)) {
      // req.session.set('user', user._id)

      // const token = generateToken({ _id: user._id, name: user.name })

      // await req.session.save()
      // return res.json({
      //   statusCode: StatusCodes.OK,
      //   message: 'Successfully logged in',
      //   token,
      //   user,
      // })
      req.session.set('user', user._id)
      let redirect = '/main'

      await req.session.save()
      return res.json({ message: 'Success', redirect })
    }

    return responseUnprocessable(res, 'Invalid password', 'password')
  } catch (e) {
    console.error(e)
    return responseInternalServerError(res)
  }
}
