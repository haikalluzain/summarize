import { Document, model, Model, Schema } from 'mongoose'
import { IEducation } from 'types/IEducation'
import { v4 } from 'uuid'

export const EducationSchema = new Schema(
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
    institute: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: false,
    },
    fieldOfStudy: {
      type: String,
      required: false,
    },
    graduationYear: {
      type: Number,
      required: true,
    },
    graduationMonth: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
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
