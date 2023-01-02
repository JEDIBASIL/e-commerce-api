import { Address } from "cluster";
import { Types } from "mongoose";
import IPaymentResult from "./paymentResult.model.interface";

interface IOrderItem {
    name: string;
    qty: number;
    img: string;
    price: number;
    product: Types.ObjectId;
}

interface IOrder {
    user: Types.ObjectId;
    orderItems: IOrderItem[];
    shippingAddress: Address
    paymentResult: IPaymentResult
    taxPrice: number;
    shippingPrize: number;
    totalPrize: number;
    isPaid: Boolean;
    paidAt: Date;
    isDelivered: boolean;
    orderedAt: Date;
}

export default IOrder