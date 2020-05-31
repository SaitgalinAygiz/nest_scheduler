import * as mongoose from "mongoose";

export interface IStudent extends mongoose.Document {
    readonly name: string
    readonly group: string
    readonly phoneNumber: string
    authToken: string
}
