import { Schema } from "mongoose";

interface IReview{
    product:Schema.Types.ObjectId
    name:string;
    rating:number;
    addedAt:Date;
    comments:string;
}

export default IReview