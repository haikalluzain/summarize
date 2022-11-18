import { Document, model, Model, Schema } from 'mongoose'
import { ICertificate } from 'types/ICertificate'
import { v4 } from 'uuid'

export const CertificateSchema = new Schema(
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

export interface ICertificateDocument extends ICertificate, Document {
  _id: string
}

export interface ICertificateModel extends Model<ICertificateDocument> {}

export const CertificateModel = model<
  ICertificateDocument,
  ICertificate & ICertificateModel
>('Certificate', CertificateSchema)
