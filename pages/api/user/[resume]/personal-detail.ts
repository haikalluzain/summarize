import { NextApiResponse } from 'next'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  successResponse,
} from 'utils/response'
import { PersonalDetailModel } from '../../../../models/PersonalDetail'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'GET') {
      const { resume } = req.query
      let personalDetail = await PersonalDetailModel.findOne({
        resume: resume,
      }).exec()

      return successResponse(
        res,
        'Get personal detail successfully',
        personalDetail
      )
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}
