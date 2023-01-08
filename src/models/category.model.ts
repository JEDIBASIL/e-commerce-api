import moment from "moment";
import { Schema, model } from "mongoose";
import { ICategory } from "../interface";

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    addedAt: {
        type: Date,
        default: () => moment().toDate()
    }
})

const categoryModel = model<Document & ICategory>("Category", categorySchema)

export default categoryModel