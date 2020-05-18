import * as mongoose from "mongoose";

export class IGroup extends mongoose.Document {
    readonly name: string;
    readonly status: string;
    students: Array<string>
}

