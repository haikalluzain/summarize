import { IUser } from './IUser'

export interface ILanguage {
  _id?: string
  user: IUser
  name: string
  rating: string
  createdAt?: Date
  updatedAt?: Date
}
