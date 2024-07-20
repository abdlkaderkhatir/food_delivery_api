import mongoose, { Model } from "mongoose";
import { IOrderItemRepository, IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { IOrderDocument, IOrderItemDocument, OrderItemModel, OrderModel } from "../models/OrderModel";
import { Order, OrderItem } from "../../domain/entities/Order";


export class OrderRepository implements IOrderRepository {

  private orderModel: Model<IOrderDocument>;
  private orderItemModel: Model<IOrderItemDocument>;

  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
  }

  async createOrder(order: Partial<Order>): Promise<Order> {
    const newOrder = new this.orderModel(order);
    await newOrder.save();
    // const orderItems = await Promise.all((order.items ?? []).map(async item => {
    //   const orderItem = new this.orderItemModel({ ...item, order_id: newOrder._id });
    //   return orderItem.save();
    // }));
    return newOrder.toObject();

  }

  async updateOrder(order: Partial<Order>): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(order._id, order, { new: true });

    if (!updatedOrder) {
      throw new Error("Failed to update order.");
    }

    return updatedOrder.toObject();
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    const result = await this.orderModel.findByIdAndDelete(orderId);
    return !!result;
  }

  async findOrderById(orderId: string): Promise<Order | null> {
    const order = await this.orderModel.findById(orderId).populate('items').exec();

    if (!order) {
      return null;
    }

    return order.toObject();
  }

  async findOrdersByUserId(userId: string): Promise<Order[]> {
    const orders = await this.orderModel.aggregate([
      { $match: { user_id:  new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'orderitems',
          localField: '_id',
          foreignField: 'order_id',
          as: 'items'
        }
      },  
      // { $unwind: '$items' },
      // {
      //   $project: {
      //     user_id: 1,
      //     restaurant_id: 1,
      //     status: 1,
      //     total_price: 1,
      //     delivery_fee: 1,
      //     grand_total: 1,
      //     delivery_address: 1,
      //     payment_method: 1,
      //     payment_status: 1,
      //     instructions: 1,
      //     createdAt: 1,
      //     updatedAt: 1,
      //     items: 1
      //   }
      // }
    ]);
    return orders.map(order => order);
  }

  // async findOrdersByStatus(status: string): Promise<Order[]> {
  //   const orders = await this.orderModel.find({ status }).populate('items').exec();

  //   return orders.map(order => order.toObject());
  // }

  // async findOrdersByRestaurantId(restaurantId: string): Promise<Order[]> {
  //   const orders = await this.orderModel.find({ restaurantId }).populate('items').exec();

  //   return orders.map(order => order.toObject());
  // }

}


export class OrderItemRepository implements IOrderItemRepository {

  private orderItemModel: Model<IOrderItemDocument>;

  constructor() {
    this.orderItemModel = OrderItemModel;
  }

  async create(orderItemData: Partial<OrderItem>): Promise<OrderItem> {
    const orderItem = new this.orderItemModel(orderItemData);
    await orderItem.save();
    return orderItem.toObject();
  }

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    const orderItems = await this.orderItemModel.find({ order_id: orderId });
    return orderItems.map(orderItem => orderItem.toObject());
  }


  async deleteItemsByOrderId(orderId: string): Promise<boolean> {
    const result = await this.orderItemModel.deleteMany({ order_id: orderId });
    return !!result;
  }


  // traditional way of deleting items by order id

  // async deleteItemsByOrderId2(orderId: string): Promise<boolean> {
  //   // get all order items by order id
  //   const orderItems = await this.orderItemModel.find({ order_id: orderId });
  //   // ensure that all order items are deleted
  //   const result = await Promise.all(orderItems.map(async orderItem => {
  //     return await this.orderItemModel.findByIdAndDelete(orderItem._id);
  //   }));

  //   return result.every(Boolean);
  // }


}