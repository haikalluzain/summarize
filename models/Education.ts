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
    institute: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    graduationYear: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
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
