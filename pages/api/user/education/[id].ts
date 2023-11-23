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
import { EducationModel } from '../../../../models/Education'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'PUT') {
      const { id } = req.query
      const education = await EducationModel.findById(id)

      if (!education) {
        return responseNotFound(res, 'Education is not found')
      }

      try {
        await validate(req, {
          institute: Yup.string().required(),
          degree: Yup.string().nullable(),
          fieldOfStudy: Yup.string().required(),
          graduationMonth: Yup.string().required(),
          graduationYear: Yup.string().required(),
          description: Yup.string().nullable(),
        })
      } catch (e) {
        return validationError(e, res)
      }

      const {
        institute,
        degree,
        fieldOfStudy,
        graduationMonth,
        graduationYear,
        description,
      } = req.body

      education.institute = institute
      education.degree = degree
      education.fieldOfStudy = fieldOfStudy
      education.graduationMonth = graduationMonth
      education.graduationYear = graduationYear
      education.description = description
      await education.save()

      return successResponse(res, 'Education updated successfully', education)
    } else if (req.method === 'DELETE') {
      const education = await EducationModel.findByIdAndDelete(req.query.id)
      if (!education) {
        return responseNotFound(res, 'Education is not found!')
      }
      return successResponse(res, 'Education deleted successfully')
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}
