import { IUser } from './IUser'

export interface IExperience {
  _id?: string
  user: IUser
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
