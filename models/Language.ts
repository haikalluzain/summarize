import { Document, model, Model, Schema } from 'mongoose'
import { ILanguage } from 'types/ILanguage'
import { v4 } from 'uuid'

export const LanguageSchema = new Schema(
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
    rating: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      required: true,
    },
  },
  { timestamps: {} }
)

export interface ILanguageDocument extends ILanguage, Document {
  _id: string
}

export interface ILanguageModel extends Model<ILanguageDocument> {}

export const LanguageModel = model<
  ILanguageDocument,
  ILanguage & ILanguageModel
>('Language', LanguageSchema)
