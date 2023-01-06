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
import { ExperienceModel } from './../../../../models/Experience'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'PUT') {
      const { id } = req.query
      const experience = await ExperienceModel.findById(id)

      if (!experience) {
        return responseNotFound(res, 'Task is not found')
      }

      try {
        await validate(req, {
          jobTitle: Yup.string().required(),
          company: Yup.string().required(),
          startMonth: Yup.string().required(),
          startYear: Yup.string().required(),
          endMonth: Yup.string().when('current', {
            is: false,
            then: Yup.string().required(),
            otherwise: Yup.string().nullable(),
          }),
          endYear: Yup.string().when('current', {
            is: false,
            then: Yup.string().required(),
            otherwise: Yup.string().nullable(),
          }),
          current: Yup.boolean().required(),
          description: Yup.string().nullable(),
        })
      } catch (e) {
        return validationError(e, res)
      }

      const {
        jobTitle,
        company,
        startMonth,
        startYear,
        endMonth,
        endYear,
        current,
        description,
      } = req.body

      experience.jobTitle = jobTitle
      experience.company = company
      experience.startMonth = startMonth
      experience.startYear = startYear
      experience.endMonth = endMonth
      experience.endYear = endYear
      experience.current = current
      experience.description = description
      await experience.save()

      return successResponse(res, 'Experience updated successfully', experience)
    } else if (req.method === 'DELETE') {
      const experience = await ExperienceModel.findByIdAndDelete(req.query.id)
      if (!experience) {
        return responseNotFound(res, 'Experience is not found!')
      }
      return successResponse(res, 'Experience deleted successfully')
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}
