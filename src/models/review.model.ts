import moment from 'moment';
import { model, Schema, Document } from 'mongoose';
import { IReview } from '../interface';

const reviewSchema = new Schema<IReview>({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
    addedAt: {
        type: Date,
        default: () => moment().toDate(),
    },
})
