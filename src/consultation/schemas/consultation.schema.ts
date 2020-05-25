import {Schema} from "mongoose";

export const ConsultationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    consultationType: { type: String, required: true },
    students: [
        {
            type: String
        }
    ],
    time: { type: Date, required: false },
    teacher: { type: String, required: false }
})
