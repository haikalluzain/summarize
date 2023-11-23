import { IResume } from './IResume'

export interface ILanguage {
  _id?: string
  resume?: IResume | string
  name: string
  rating: string
  createdAt?: Date
  updatedAt?: Date
}
