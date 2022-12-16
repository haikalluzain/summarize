import { Document, model, Model, Schema } from 'mongoose'
import { IResume } from 'types/IResume'
import { v4 } from 'uuid'

export const ResumeSchema = new Schema(
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
    title: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: {} }
)

export interface IResumeDocument extends IResume, Document {
  _id: string
}

export interface IResumeModel extends Model<IResumeDocument> {}

export const ResumeModel = model<IResumeDocument, IResume & IResumeModel>(
  'Resume',
  ResumeSchema
)
