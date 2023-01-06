import { NextApiResponse } from 'next'
import { ISkill } from 'types/ISkill'
import nextMiddleware, { NextApiRequestWithSession } from 'utils/nextMiddleware'
import {
  responseInternalServerError,
  responseMethodNotAllowed,
  successResponse,
} from 'utils/response'
import { validate, validationError } from 'utils/validation'
import * as Yup from 'yup'
import { SkillModel } from '../../../../models/Skill'

interface SkillApiRequest extends NextApiRequestWithSession {
  body: ISkill
}

type TaskListQuery = {
  keyword?: string
  startDate?: string
  endDate?: string
}

interface SkillListApiRequest extends NextApiRequestWithSession {
  query: TaskListQuery
}

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse
) {
  try {
    await nextMiddleware(req, res)

    if (req.method === 'GET') {
      // return getTaskList(req as SkillListApiRequest, res)
    } else if (req.method === 'POST') {
      return createSkill(req, res)
    }

    return responseMethodNotAllowed(res)
  } catch (error) {
    console.log(error.stack)
    return responseInternalServerError(res)
  }
}

const createSkill = async (req: SkillApiRequest, res: NextApiResponse) => {
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

  const skill = await SkillModel.create({
    resume,
    name,
    rating,
  })

  return successResponse(res, 'Successfully created the Skill', skill)
}
