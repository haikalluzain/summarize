import { IResume } from './IResume'

export interface IPersonalDetail {
  _id?: string
  resume?: IResume
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
