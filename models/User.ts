import mongoose, { Document, Model, model, Schema } from 'mongoose'
import { IUser } from '../types/IUser'
import { v4 } from 'uuid'
import { compareHash } from '../utils/password'

export const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return v4()
      },
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: {} }
)
export interface IUserDocument extends IUser, Document {
  _id: string
  isPasswordMatch: (password: string) => Promise<boolean>
}

export interface IUserModel extends Model<IUserDocument> {
  isEmailTaken: (email: string, excludeId?: string) => Promise<boolean>
}

/**
 * Check if the password match
 * @param password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (
  this: IUserDocument,
  password: string
): Promise<boolean> {
  const user = this
  return await compareHash(password, user.password)
}

/**
 * Check if email is already registered
 * @param {string} email
 * @param {string} excludeId
 * @returns {Promise<boolean>}
 */
UserSchema.statics.isEmailTaken = async function (
  this: Model<IUserModel>,
  email: string,
  excludeId?: string
): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeId } })
  return !!user
}

export const UserModel = model<IUserDocument, IUser & IUserModel>(
  'User',
  UserSchema
)
