import { IResume } from './IResume'

export interface IEducation {
  _id?: string
  resume?: IResume | string
  institute: string
  degree: string
  fieldOfStudy: string
  graduationYear: number
  graduationMonth: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}
