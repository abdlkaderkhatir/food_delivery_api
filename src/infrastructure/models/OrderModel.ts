import { model, Schema } from "mongoose";
import { Order, OrderItem } from "../../domain/entities/Order";


export interface IOrderDocument extends Document , Omit<Order, 'id'> {}

export interface IOrderItemDocument extends Document , OrderItem {}


const OrderItemSchema = new Schema({
  foodId: { type: String, required: true },
  quantity: { type: Number, required: true },
});


const OrderSchema = new Schema({
  userId: { type: String, required: true },
  items: [OrderItemSchema],
  status: { type: String, required: true },
  total: { type: Number, required: true },
}, { timestamps: true });


export const OrderModel = model<IOrderDocument>('Order', OrderSchema);
export const OrderItemModel = model<IOrderItemDocument>('OrderItem', OrderItemSchema);