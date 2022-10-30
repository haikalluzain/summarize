import { NextApiResponse } from 'next'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  successResponse,
} from 'utils/response'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    req = await nextMiddleware(req, res)

    if (req.method !== 'DELETE') {
      return responseMethodNotAllowed(res)
    }

    req.session.destroy()

    return successResponse(res, 'Successfully log out')
  } catch (error) {
    console.log(error)
    return responseInternalServerError(res)
  }
}
