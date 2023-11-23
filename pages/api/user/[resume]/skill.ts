import { NextApiResponse } from 'next'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  successResponse,
} from 'utils/response'
import { SkillModel } from '../../../../models/Skill'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'GET') {
      const { resume } = req.query
      let skills = await SkillModel.find({
        resume: resume,
      }).exec()

      return successResponse(res, 'Get skills successfully', skills)
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}
