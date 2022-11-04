import { IResume } from './IResume'

export interface ISkill {
  _id?: string
  resume: IResume
  name: string
  rating: string
  createdAt?: Date
  updatedAt?: Date
}
