import { IUser } from './IUser'

export interface IResume {
  _id?: string
  user: IUser
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}
