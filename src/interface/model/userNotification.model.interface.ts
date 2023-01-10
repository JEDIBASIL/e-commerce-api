import { Schema } from "mongoose"

interface IUserNotification {
    title: string
    message: string
    icon: string
    account:Schema.Types.ObjectId
    notId:string
}

export default IUserNotification