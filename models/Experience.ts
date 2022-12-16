import { Document, model, Model, Schema } from 'mongoose'
import { IExperience } from 'types/IExperience'
import { v4 } from 'uuid'

export const ExperienceSchema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return v4()
      },
    },
    resume: {
      type: String,
      required: true,
      ref: 'Resume',
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
      required: false,
    },
    endMonth: {
      type: String,
      required: false,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: {} }
)

export interface IExperienceDocument extends IExperience, Document {
  _id: string
}

export interface IExperienceModel extends Model<IExperienceDocument> {}

export const ExperienceModel = model<
  IExperienceDocument,
  IExperience & IExperienceModel
>('Experience', ExperienceSchema)
