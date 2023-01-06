import { Client } from '@elastic/elasticsearch'
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
import { PersonalDetailModel } from './../../../../models/PersonalDetail'

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'PUT') {
      const { id } = req.query
      const personal = await PersonalDetailModel.findById(id)

      if (!personal) {
        return responseNotFound(res, 'Task is not found')
      }

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
        firstName,
        lastName,
        jobTitle,
        email,
        phoneNumber,
        website,
        country,
        city,
        resume,
      } = req.body

      personal.firstName = firstName
      personal.lastName = lastName
      personal.jobTitle = jobTitle
      personal.email = email
      personal.phoneNumber = phoneNumber
      personal.website = website
      personal.country = country
      personal.city = city
      await personal.save()

      const doc = {
        full_name: `${firstName} ${lastName}`,
        job_title: jobTitle,
        email,
        phone_number: phoneNumber,
        country,
        city,
      }

      const client = new Client({
        node: 'http://localhost:9200',
      })

      client.update({
        index: 'candidates',
        id: resume,
        body: { doc },
      })

      return successResponse(
        res,
        'Personal detail updated successfully',
        personal
      )
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}
