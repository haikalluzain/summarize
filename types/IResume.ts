import { IUser } from './IUser'

export interface IResume {
  _id?: string
  user: IUser
  title: string
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}
