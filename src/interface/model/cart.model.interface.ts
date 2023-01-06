import { Schema } from "mongoose";

interface ICart {
    product: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    price: number;
    qty: number;
}

export default ICart