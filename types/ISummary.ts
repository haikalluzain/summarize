import { IUser } from './IUser'

export interface ISummary {
  _id?: string
  user: IUser
  body: string
  active: boolean
}
