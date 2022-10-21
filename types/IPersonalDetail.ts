import { IUser } from './IUser'

export interface IPersonalDetail {
  _id?: string
  user: IUser
  firstName: string
  lastName?: string
  jobTitle: string
  email: string
  phoneNumber: string
  website?: string
  country: string
  photo?: string
  city: string
  createdAt?: Date
  updatedAt?: Date
}
