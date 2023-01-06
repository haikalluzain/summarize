import { NextApiResponse } from 'next'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  responseNotFound,
  successResponse,
} from 'utils/response'
import { validate, validationError } from 'utils/validation'
import * as Yup from 'yup'
import { SkillModel } from '../../../../models/Skill'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'PUT') {
      const { id } = req.query
      const skill = await SkillModel.findById(id)

      if (!skill) {
        return responseNotFound(res, 'Task is not found')
      }

      try {
        await validate(req, {
          name: Yup.string().required(),
          rating: Yup.string().required(),
        })
      } catch (e) {
        return validationError(e, res)
      }

      const { name, rating } = req.body

      skill.name = name
      skill.rating = rating
      await skill.save()

      return successResponse(res, 'Skill updated successfully', skill)
    } else if (req.method === 'DELETE') {
      const skill = await SkillModel.findByIdAndDelete(req.query.id)
      if (!skill) {
        return responseNotFound(res, 'Skill is not found!')
      }
      return successResponse(res, 'Skill deleted successfully')
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}
