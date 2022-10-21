import { Document, model, Model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { IEducation } from 'types/IEducation'

export const EducationSchema = new Schema(
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
    name: {
      type: String,
      required: true,
    },
    organization: {
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
    doesNotExpire: {
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

export interface IEducationDocument extends IEducation, Document {
  _id: string
}

export interface IEducationModel extends Model<IEducationDocument> {}

export const EducationModel = model<
  IEducationDocument,
  IEducation & IEducationModel
>('Education', EducationSchema)
