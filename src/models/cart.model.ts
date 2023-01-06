import { Schema, model } from "mongoose";
import { ICart } from "../interface";

const cartSchema = new Schema<ICart>({
    product: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const cartModel = model<Document & ICart>("Cart", cartSchema)