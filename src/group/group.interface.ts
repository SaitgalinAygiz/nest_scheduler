import * as mongoose from "mongoose";

export class IGroup extends mongoose.Document {
    name: string;
    status: string;
    students: Array<string>
}

