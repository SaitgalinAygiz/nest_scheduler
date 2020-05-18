import {Moment} from "moment";

export interface IReadableUser {

  readonly email: string
  readonly lastName: string
  readonly firstName: string
  readonly roles: Array<string>
  accessToken?: string
  expireAt?: string

}
