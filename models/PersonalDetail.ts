import { Document, model, Model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { IPersonalDetail } from 'types/IPersonalDetail'

export const PerIPersonalDetailSchema = new Schema(
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

export const PerIPersonalDetailModel = model<
  IPersonalDetailDocument,
  IPersonalDetail & IPersonalDetailModel
>('PerIPersonalDetail', PerIPersonalDetailSchema)
