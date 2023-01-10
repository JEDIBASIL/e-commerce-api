import { Schema, model, Document, CallbackWithoutResultAndOptionalError } from "mongoose";
import { IAdmin } from "../interface";
import moment from "moment";
import Status from "../enums/status.enum";
import AdminRoles from "../enums/admin.enum";
import bcrypt from "bcrypt"

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
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    addedBy: {
        type: String,
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

adminSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  })

adminSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

const adminModel = model<Document & IAdmin>("Admin", adminSchema)
export default adminModel