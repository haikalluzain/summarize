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
import { CertificateModel } from '../../../../models/Certificate'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'PUT') {
      const { id } = req.query
      const certificate = await CertificateModel.findById(id)

      if (!certificate) {
        return responseNotFound(res, 'Task is not found')
      }

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
        name,
        organization,
        startMonth,
        startYear,
        endMonth,
        endYear,
        doesNotExpire,
        description,
      } = req.body

      certificate.name = name
      certificate.organization = organization
      certificate.startMonth = startMonth
      certificate.startYear = startYear
      certificate.endMonth = endMonth
      certificate.endYear = endYear
      certificate.doesNotExpire = doesNotExpire
      certificate.description = description
      await certificate.save()

      return successResponse(
        res,
        'Certificate updated successfully',
        certificate
      )
    } else if (req.method === 'DELETE') {
      const certificate = await CertificateModel.findByIdAndDelete(req.query.id)
      if (!certificate) {
        return responseNotFound(res, 'Certificate is not found!')
      }
      return successResponse(res, 'Certificate deleted successfully')
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}
