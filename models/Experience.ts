import { Document, model, Model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { IExperience } from 'types/IExperience'

export const ExIExperienceSchema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return v4()
      },
    },
    user: {
      type: String,
      required: true,
      ref: 'User',
    },
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    startYear: {
      type: Number,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endYear: {
      type: Number,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
    },
    current: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: {} }
)

export interface IExperienceDocument extends IExperience, Document {
  _id: string
}

export interface IExperienceModel extends Model<IExperienceDocument> {}

export const ExIExperienceModel = model<
  IExperienceDocument,
  IExperience & IExperienceModel
>('ExIExperience', ExIExperienceSchema)
