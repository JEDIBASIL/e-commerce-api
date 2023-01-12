import { Schema, model, Document } from "mongoose";
import { ITemplate } from "../interface";

const templateSchema = new Schema<ITemplate>({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    filename: {
        type: String,
        required: true,
        unique: true
    },
    path:{
        type:String,
        required:true,
    },
    addedBy: {
        type: String,
        required: true,
        unique: true
    }
})

const templateModel = model<Document & ITemplate>("template", templateSchema)

export default templateModel