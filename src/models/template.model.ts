import { Schema, model, Document } from "mongoose";
import { ITemplate } from "../interface";
import moment from "moment";

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
    },
    path:{
        type:String,
        required:true,
    },
    addedBy: {
        type: String,
        required: true,
    },
    addedAt:{
        type:Date,
        required:true,
        default:() => moment().toDate()
    }
})

const templateModel = model<Document & ITemplate>("template", templateSchema)

export default templateModel