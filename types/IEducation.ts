import { IUser } from './IUser'

export interface IEducation {
  _id?: string
  user: IUser
  institute: string
  degree: string
  graduationYear: number
  month: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}
