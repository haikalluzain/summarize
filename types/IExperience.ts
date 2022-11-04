import { IResume } from './IResume'

export interface IExperience {
  _id?: string
  resume: IResume
  jobTitle: string
  company: string
  startYear: number
  startMonth: string
  endYear: number
  endMonth: string
  current: boolean
  description: string
  createdAt?: Date
  updatedAt?: Date
}
