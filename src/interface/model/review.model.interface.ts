import { Schema } from "mongoose";

interface IReview{
    product:Schema.Types.ObjectId
    rating:number;
    addedAt:Date;
    comments:string;
}

export default IReview