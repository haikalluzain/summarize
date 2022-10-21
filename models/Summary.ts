import { Document, model, Model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { ISummary } from 'types/ISummary'

export const SummarySchema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return v4()
      },
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: {} }
)

export interface ISummaryDocument extends ISummary, Document {
  _id: string
}

export interface ISummaryModel extends Model<ISummaryDocument> {}

export const SummaryModel = model<ISummaryDocument, ISummary & ISummaryModel>(
  'Summary',
  SummarySchema
)
