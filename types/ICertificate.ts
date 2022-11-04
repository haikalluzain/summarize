import { IResume } from './IResume'

export interface ICertificate {
  _id?: string
  resume: IResume
  name: string
  organization: string
  startYear: number
  startMonth: string
  endYear: number
  endMonth: string
  doesNotExpire: boolean
  description: string
  createdAt?: Date
  updatedAt?: Date
}
