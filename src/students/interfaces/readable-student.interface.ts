import * as mongoose from "mongoose";

export interface ReadableStudentInterface {
    readonly name: string;
    readonly group: string;
}
