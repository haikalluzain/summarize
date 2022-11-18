import { Document, model, Model, Schema } from 'mongoose'
import { IPersonalDetail } from 'types/IPersonalDetail'
import { v4 } from 'uuid'

export const PersonalDetailSchema = new Schema(
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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: {} }
)

export interface IPersonalDetailDocument extends IPersonalDetail, Document {
  _id: string
}

export interface IPersonalDetailModel extends Model<IPersonalDetailDocument> {}

export const PersonalDetailModel = model<
  IPersonalDetailDocument,
  IPersonalDetail & IPersonalDetailModel
>('PersonalDetail', PersonalDetailSchema)
