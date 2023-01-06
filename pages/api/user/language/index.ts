import { NextApiResponse } from 'next'
import { ILanguage } from 'types/ILanguage'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  successResponse,
} from 'utils/response'
import { validate, validationError } from 'utils/validation'
import * as Yup from 'yup'
import { LanguageModel } from '../../../../models/Language'

interface LanguageApiRequest extends NextApiRequestWithSession {
  body: ILanguage
}

type TaskListQuery = {
  keyword?: string
  startDate?: string
  endDate?: string
}

interface LanguageListApiRequest extends NextApiRequestWithSession {
  query: TaskListQuery
}

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'GET') {
      // return getTaskList(req as LanguageListApiRequest, res)
    } else if (req.method === 'POST') {
      return createLanguage(req, res)
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}

const createLanguage = async (
  req: LanguageApiRequest,
  res: NextApiResponse
) => {
  //validation
  try {
    await validate(req, {
      resume: Yup.string().required(),
      name: Yup.string().required(),
      rating: Yup.string().required(),
    })
  } catch (e) {
    return validationError(e, res)
  }

  const { resume, name, rating } = req.body

  const Language = await LanguageModel.create({
    resume,
    name,
    rating,
  })

  return successResponse(res, 'Successfully created the Language', Language)
}
