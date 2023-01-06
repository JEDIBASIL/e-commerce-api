import { Schema } from "mongoose";

interface IProduct{
    name:string;
    image:string;
    category:Schema.Types.ObjectId;
    description:string;
    rating:number;
    reviews:any[]
    numReviews:number;
    addedAt:Date;
    qty:number;
    price:number;
}

export default IProduct