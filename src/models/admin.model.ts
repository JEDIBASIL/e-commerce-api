import { Schema, model } from "mongoose";
import { IAdmin } from "../interface";
import moment from "moment";
import Status from "../enums/status.enum";
import AdminRoles from "../enums/admin.enum";

const adminSchema = new Schema<IAdmin>({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    addedAt: {
        type: Date,
        default: () => moment().toDate()
    },
    status: {
        type: String,
        default: Status.UNBLOCKED
    },
    role: {
        type: String,
        required: true,
        default: AdminRoles.ADMIN
    }
})

const adminModel = model<Document & IAdmin>("Admin", adminSchema)
export default adminModel