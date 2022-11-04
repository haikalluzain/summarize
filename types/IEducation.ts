import { IResume } from './IResume'

export interface IEducation {
  _id?: string
  resume: IResume
  institute: string
  degree: string
  graduationYear: number
  month: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}
