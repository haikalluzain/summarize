import { IUser } from './IUser'

export interface ICertificate {
  _id?: string
  user: IUser
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
