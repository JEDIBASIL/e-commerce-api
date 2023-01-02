import moment from 'moment';
import { model, Schema, Document } from 'mongoose';
import { IProduct } from '../interface';



const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    addedAt: {
        type: Date,
    },
})