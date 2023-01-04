import moment from 'moment';
import { model, Schema, Document, Types } from 'mongoose';
import { IReview } from '../interface';

const reviewSchema = new Schema<IReview>({
    product:{
        type:Schema.Types.ObjectId,
        required:true,
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

const reviewModel = model<Document & IReview>("Review", reviewSchema);

export default reviewModel
