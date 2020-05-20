import {Schema} from "mongoose";

export const TeacherSchema = new Schema({
    name: { type: String, required: true, unique: true },
    picture: { type: String, required: false }
})
