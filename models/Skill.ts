import { Document, model, Model, Schema } from 'mongoose'
import { ISkill } from 'types/ISkill'
import { v4 } from 'uuid'

export const SkillSchema = new Schema(
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

export interface ISkillDocument extends ISkill, Document {
  _id: string
}

export interface ISkillModel extends Model<ISkillDocument> {}

export const SkillModel = model<ISkillDocument, ISkill & ISkillModel>(
  'Skill',
  SkillSchema
)
