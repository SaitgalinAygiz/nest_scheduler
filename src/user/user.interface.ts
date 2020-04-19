import { Document } from 'mongoose'

export interface IUser extends Document {
  readonly email: string
  readonly firstName: string
  readonly lastName: string
  readonly roles: Array<string>
  readonly password: string
  status: string
}