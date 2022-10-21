import { Document, model, Model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { ILanguage } from 'types/ILanguage'

export const LanguageSchema = new Schema(
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
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      required: true,
    },
    rating: {
      type: String,
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
