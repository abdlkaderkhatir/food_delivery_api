import mongoose, { Document, model, Schema } from "mongoose";
import { Order, OrderItem } from "../../domain/entities/Order";


export interface IOrderDocument extends Document , Omit<Order, '_id'> {}

export interface IOrderItemDocument extends Document , Omit<OrderItem , '_id'> {}



const OrderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId as any, ref: 'User', required: true },
    restaurant_id: { type: Schema.Types.ObjectId as any, ref: 'Restaurant', required: true },
    // items: [{ type: Schema.Types.ObjectId as any, ref: 'OrderItem' }],
    status: { type: String, default: 'pending' },
    total_price: { type: Number, default: 0 },
    delivery_fee: { type: Number, default: 0 },
    grand_total: { type: Number, default: 0 },
    delivery_address: { type: String, default: '' },
    payment_method: { type: String, default: 'cash' },
    payment_status: { type: String, default: 'unpaid' },
    instructions: { type: String, default: '' },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
}, { timestamps: true });




const OrderItemSchema = new Schema({
    order_id: { type: Schema.Types.ObjectId as any, ref: 'Order', required: true },
    item_id: { type: Schema.Types.ObjectId as any, ref: 'Item', required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
}, { timestamps: true });





export const OrderModel = model<IOrderDocument>('Order', OrderSchema);
export const OrderItemModel = model<IOrderItemDocument>('OrderItem', OrderItemSchema);



// status : pending | completed | cancelled
// payment_method : cash | card
// payment_status : paid | unpaid

// generate exmple of json how to insert data in order and orderItem
// {
//     "user_id": "60e6d5e4a4e8c1d7e8b0e3f6",
//     "restaurant_id": "60e6d5e4a4e8c1d7e8b0e3f6",
//     "items": [
//         {
//             "item_id": "60e6d5e4a4e8c1d7e8b0e3f6",
//             "quantity": 2,
//             "price": 100
//         },
//         {
//             "item_id": "60e6d5e4a4e8c1d7e8b0e3f6",
//             "quantity": 1,
//             "price": 50
//         }
//     ],
//     "status": "pending",
//     "total_price": 250,
//     "delivery_fee": 20,
//     "grand_total": 270,
//     "delivery_address": "Dhaka",
//     "payment_method": "cash",
//     "payment_status": "unpaid",
//     "instructions": "Please make it fast"
// }


// generate exmple of json how to insert data in orderItem
// {
//     "order_id": "60e6d5e4a4e8c1d7e8b0e3f6",
//     "item_id": "60e6d5e4a4e8c1d7e8b0e3f6",
//     "quantity": 2,
//     "price": 100,
// }
