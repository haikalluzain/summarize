import { NextApiResponse } from 'next'
import { IExperience } from 'types/IExperience'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  successResponse,
} from 'utils/response'
import { validate, validationError } from 'utils/validation'
import * as Yup from 'yup'
import { ExperienceModel } from './../../../../models/Experience'

interface ExperienceApiRequest extends NextApiRequestWithSession {
  body: IExperience
}

type TaskListQuery = {
  keyword?: string
  startDate?: string
  endDate?: string
}

interface ExperienceListApiRequest extends NextApiRequestWithSession {
  query: TaskListQuery
}

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'GET') {
      // return getTaskList(req as ExperienceListApiRequest, res)
    } else if (req.method === 'POST') {
      return createExperience(req, res)
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}

const createExperience = async (
  req: ExperienceApiRequest,
  res: NextApiResponse
) => {
  //validation
  try {
    await validate(req, {
      resume: Yup.string().required(),
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
    resume,
    jobTitle,
    company,
    startMonth,
    startYear,
    endMonth,
    endYear,
    current,
    description,
  } = req.body

  const experience = await ExperienceModel.create({
    resume,
    jobTitle,
    company,
    startMonth,
    startYear,
    endMonth,
    endYear,
    current,
    description,
  })

  return successResponse(res, 'Successfully created the experience', experience)
}
