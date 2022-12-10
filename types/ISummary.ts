import { IResume } from './IResume'

export interface ISummary {
  _id?: string
  resume?: IResume
  body: string
  active: boolean
}
