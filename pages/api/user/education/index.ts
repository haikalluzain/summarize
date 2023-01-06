import { EducationModel } from 'models/Education'
import { NextApiResponse } from 'next'
import { IEducation } from 'types/IEducation'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  successResponse,
} from 'utils/response'
import { validate, validationError } from 'utils/validation'
import * as Yup from 'yup'

interface EducationApiRequest extends NextApiRequestWithSession {
  body: IEducation
}

type TaskListQuery = {
  keyword?: string
  startDate?: string
  endDate?: string
}

interface EducationListApiRequest extends NextApiRequestWithSession {
  query: TaskListQuery
}

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'GET') {
      // return getTaskList(req as EducationListApiRequest, res)
    } else if (req.method === 'POST') {
      return createEducation(req, res)
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}

const createEducation = async (
  req: EducationApiRequest,
  res: NextApiResponse
) => {
  //validation
  try {
    await validate(req, {
      resume: Yup.string().required(),
      institute: Yup.string().required(),
      degree: Yup.string().required(),
      fieldOfStudy: Yup.string().required(),
      graduationMonth: Yup.string().required(),
      graduationYear: Yup.string().required(),
      description: Yup.string().nullable(),
    })
  } catch (e) {
    return validationError(e, res)
  }

  const {
    resume,
    institute,
    degree,
    fieldOfStudy,
    graduationMonth,
    graduationYear,
    description,
  } = req.body

  const education = await EducationModel.create({
    resume,
    institute,
    degree,
    fieldOfStudy,
    graduationMonth,
    graduationYear,
    description,
  })

  return successResponse(res, 'Successfully created the Education', education)
}
