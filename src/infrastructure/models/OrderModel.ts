import mongoose, { model, Schema } from "mongoose";
import { Order, OrderItem } from "../../domain/entities/Order";


export interface IOrderDocument extends Document , Omit<Order, 'id'> {}

export interface IOrderItemDocument extends Document , Omit<OrderItem , 'id'> {
}


// const OrderItemSchema = new Schema({
//   orderId: { type: String, required: true },
//   foodId: { type: String, required: true },
//   quantity: { type: Number, required: true },

// });

const OrderItemSchema = new Schema<IOrderItemDocument>({
  orderId: { type: Schema.Types.ObjectId as any, ref: 'Order', required: true },
  foodId: { type: Schema.Types.ObjectId as any, ref: 'Food', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});


const OrderSchema = new Schema({
  userId: { type: String, required: true },
  status: { type: String, required: true },
  total: { type: Number, required: true },
}, { timestamps: true });





export const OrderModel = model<IOrderDocument>('Order', OrderSchema);
export const OrderItemModel = model<IOrderItemDocument>('OrderItem', OrderItemSchema);