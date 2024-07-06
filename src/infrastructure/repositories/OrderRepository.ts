import { Model } from "mongoose";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { IOrderDocument, IOrderItemDocument, OrderItemModel, OrderModel } from "../models/OrderModel";
import { Order } from "../../domain/entities/Order";

export class OrderRepository implements IOrderRepository {

  private orderModel: Model<IOrderDocument>;
  private orderItemModel: Model<IOrderItemDocument>;

  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
  }


//   async getOrdersWithDetails(userId: string): Promise<any[]> {
//     const orders = await this.orderModel.find({ userId }).populate('items').exec(); // what is the purpose of exec() here?
//     const ordersWithDetails = await Promise.all(orders.map(async order => {
//       const items = await Promise.all(order.items.map(async item => {
//         const food = await this.foodRepo.findById(item.foodId);
//         return {
//           ...item,
//           food,
//         };
//       }));
//       return {
//         ...order.toObject(),
//         items,
//       };
//     }));

//     return ordersWithDetails;
//   }

  async create(order: Partial<Order>): Promise<Order> {

    const orderItems = await Promise.all((order.items ?? []).map(async item => {
      const orderItem = new this.orderItemModel(item);
      return orderItem.save();
    }));


    const newOrder = new this.orderModel({
        ...order,
        items: orderItems.map(item => item._id),
    });


    await newOrder.save();

    return newOrder.toObject();
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.orderModel.findById(id).populate('items').exec();

    if (!order) {
      return null;
    }

    return order.toObject();
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const orders = await this.orderModel.find({ userId }).populate('items').exec();

    return orders.map(order => order.toObject());
  }

  async update(order: Order): Promise<Order> {
    const orderItems = await Promise.all(order.items.map(async item => {
      if (item.foodId) {
        return this.orderItemModel.findByIdAndUpdate(item.foodId, item, { new: true });
      }

      const orderItem = new this.orderItemModel(item);
      return orderItem.save();
    }));

    const updatedOrder = await this.orderModel.findByIdAndUpdate(order.id, {
      ...order,
      items: orderItems.map(item => item),
    }, { new: true });

    if (updatedOrder) {
      return updatedOrder.toObject();
    } else {
      throw new Error("Failed to update order.");
    }
  }

  async delete(id: string): Promise<void> {
    await this.orderModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<Order[]> {
        const orders = await this.orderModel.find().populate('items').exec();

        return orders.map(order => order.toObject());
  }   
}