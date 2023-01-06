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
import { LanguageModel } from '../../../../models/Language'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'PUT') {
      const { id } = req.query
      const language = await LanguageModel.findById(id)

      if (!language) {
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

      language.name = name
      language.rating = rating
      await language.save()

      return successResponse(res, 'Language updated successfully', language)
    } else if (req.method === 'DELETE') {
      const language = await LanguageModel.findByIdAndDelete(req.query.id)
      if (!language) {
        return responseNotFound(res, 'Language is not found!')
      }
      return successResponse(res, 'Language deleted successfully')
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}
