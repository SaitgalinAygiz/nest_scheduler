import {Document} from "mongoose";

export class IConsultation extends Document {
    name: string
    description: string
    students: Array<string>
    time: Date
    teacher: string
    consultationType: string
}
