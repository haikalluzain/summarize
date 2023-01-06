import { NextApiResponse } from 'next'
import { ICertificate } from 'types/ICertificate'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  successResponse,
} from 'utils/response'
import { validate, validationError } from 'utils/validation'
import * as Yup from 'yup'
import { CertificateModel } from '../../../../models/Certificate'

interface CertificateApiRequest extends NextApiRequestWithSession {
  body: ICertificate
}

type TaskListQuery = {
  keyword?: string
  startDate?: string
  endDate?: string
}

interface CertificateListApiRequest extends NextApiRequestWithSession {
  query: TaskListQuery
}

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'GET') {
      // return getTaskList(req as CertificateListApiRequest, res)
    } else if (req.method === 'POST') {
      return createCertificate(req, res)
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}

const createCertificate = async (
  req: CertificateApiRequest,
  res: NextApiResponse
) => {
  //validation
  try {
    await validate(req, {
      resume: Yup.string().required(),
      name: Yup.string().required(),
      organization: Yup.string().required(),
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
      doesNotExpire: Yup.boolean().required(),
      description: Yup.string().nullable(),
    })
  } catch (e) {
    return validationError(e, res)
  }

  const {
    resume,
    name,
    organization,
    startMonth,
    startYear,
    endMonth,
    endYear,
    doesNotExpire,
    description,
  } = req.body

  const Certificate = await CertificateModel.create({
    resume,
    name,
    organization,
    startMonth,
    startYear,
    endMonth,
    endYear,
    doesNotExpire,
    description,
  })

  return successResponse(
    res,
    'Successfully created the Certificate',
    Certificate
  )
}
