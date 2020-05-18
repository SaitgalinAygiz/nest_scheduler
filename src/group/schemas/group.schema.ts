import * as mongoose from "mongoose";
import {GroupStatusEnum} from "../enums/group-status.enum";
import {StudentSchema} from "../../students/schemas/student.schema";

export const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(GroupStatusEnum),
        default: GroupStatusEnum.active
    },
    students: [
        {
            type: String
        }
    ]

})
