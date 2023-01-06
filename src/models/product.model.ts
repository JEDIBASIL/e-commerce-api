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
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    qty: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    numReviews: {
        type: Number,
        default: 0
    },
    addedAt: {
        type: Date,
        default: () => moment().toDate()
    },
})

const productModel = model<Document & IProduct>("Product", productSchema);
export default productModel;