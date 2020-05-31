import {Schema} from "mongoose";

export const TeacherSchema = new Schema({
    name: { type: String, required: true, unique: true },
    picture: { type: String, required: false },
    phoneNumber: { type: String, required: true, unique: true },
    authToken: { type: String, required: false, unique: true }
})
