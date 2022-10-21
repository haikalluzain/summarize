import { Document, model, Model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { ISkill } from 'types/ISkill'

export const SkillSchema = new Schema(
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

export interface ISkillDocument extends ISkill, Document {
  _id: string
}

export interface ISkillModel extends Model<ISkillDocument> {}

export const SkillModel = model<ISkillDocument, ISkill & ISkillModel>(
  'Skill',
  SkillSchema
)
