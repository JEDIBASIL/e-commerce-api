import { Schema, model } from "mongoose";
import { IUserNotification } from "../interface";
import { v4 } from "uuid"

const userNotificationSchema = new Schema<IUserNotification>({
    account: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    notId: {
        type: String,
        default: v4()
    }
})

const userNotificationModel = model<Document & IUserNotification>("UserNotification", userNotificationSchema)
export default userNotificationModel