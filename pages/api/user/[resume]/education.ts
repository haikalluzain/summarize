import { NextApiResponse } from 'next'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  successResponse,
} from 'utils/response'
import { EducationModel } from '../../../../models/Education'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'GET') {
      const { resume } = req.query
      let educations = await EducationModel.find({
        resume: resume,
      }).exec()

      return successResponse(res, 'Get educations successfully', educations)
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}
