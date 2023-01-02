import moment from 'moment';
import mongoose, { model, Schema, Document } from 'mongoose';
import {IOrder} from '../interface/';

const orderSchema = new Schema<IOrder>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            img: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentResult: {
        id: {
            type: String
        },
        status: {
            type: String
        },
        update_time: {
            type: String
        },
        email: {
            type: String
        },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrize: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrize: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    orderedAt: {
        type: Date,
        default: () => moment().toDate()
    },
})

const orderModel = model<Document & IOrder>("Order",orderSchema)
export default orderModel