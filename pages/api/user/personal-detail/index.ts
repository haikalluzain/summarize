import { NextApiResponse } from 'next'
import { IPersonalDetail } from 'types/IPersonalDetail'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  successResponse,
} from 'utils/response'
import { validate, validationError } from 'utils/validation'
import * as Yup from 'yup'
import { PersonalDetailModel } from './../../../../models/PersonalDetail'

interface PersonalDetailApiRequest extends NextApiRequestWithSession {
  body: IPersonalDetail
}

type TaskListQuery = {
  keyword?: string
  startDate?: string
  endDate?: string
}

interface PersonalDetailListApiRequest extends NextApiRequestWithSession {
  query: TaskListQuery
}

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'GET') {
      // return getPersonalDetail(req as PersonalDetailListApiRequest, res)
    } else if (req.method === 'POST') {
      return createPersonalDetail(req, res)
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}

const createPersonalDetail = async (
  req: PersonalDetailApiRequest,
  res: NextApiResponse
) => {
  //validation
  try {
    await validate(req, {
      firstName: Yup.string().required(),
      lastName: Yup.string().nullable(),
      jobTitle: Yup.string().required(),
      email: Yup.string().email().required(),
      phoneNumber: Yup.string().nullable(),
      website: Yup.string().nullable(),
      country: Yup.string().nullable(),
      city: Yup.string().nullable(),
    })
  } catch (e) {
    return validationError(e, res)
  }

  const {
    resume,
    firstName,
    lastName,
    jobTitle,
    email,
    phoneNumber,
    website,
    country,
    city,
  } = req.body

  const personal = await PersonalDetailModel.create({
    resume,
    firstName,
    lastName,
    jobTitle,
    email,
    phoneNumber,
    website,
    country,
    city,
  })

  return successResponse(
    res,
    'Successfully created the personal details',
    personal
  )
}
