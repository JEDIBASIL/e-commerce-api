import { Schema } from "mongoose";

interface IReview{
    user:Schema.Types.ObjectId
    rating:number;
    addedAt:Date;
    comments:string;
}

export default IReview