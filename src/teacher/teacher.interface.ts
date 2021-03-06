import * as mongoose from "mongoose";

export interface ITeacher extends mongoose.Document {
    name: string
    picture: string
    phoneNumber: string
    authToken: string
}
