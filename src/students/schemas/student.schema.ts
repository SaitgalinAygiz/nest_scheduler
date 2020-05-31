import * as mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    group: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    authToken: { type: String, required: false, unique: true }

})
