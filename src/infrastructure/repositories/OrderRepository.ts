import { Model } from "mongoose";
import { IOrderItemRepository, IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { IOrderDocument, IOrderItemDocument, OrderItemModel, OrderModel } from "../models/OrderModel";
import { Order, OrderItem } from "../../domain/entities/Order";


// export class OrderRepository implements IOrderRepository {

//   private  orderModel: Model<IOrderDocument>;
//   private  orderItemModel: Model<IOrderItemDocument>;

//   constructor() {
//     this.orderModel = OrderModel;
//     this.orderItemModel = OrderItemModel;
//   }

  // async getOrdersWithDetails(userId: string): Promise<any[]> {
  //   const orders = await this.orderModel.find({ userId }).populate('items').exec(); // what is the purpose of exec() here?
  //   const ordersWithDetails = await Promise.all(orders.map(async order => {
  //     const items = await Promise.all(order.items.map(async item => {
  //       const food = await this.foodRepo.findById(item.foodId);
  //       return {
  //         ...item,
  //         food,
  //       };
  //     }));
  //     return {
  //       ...order.toObject(),
  //       items,
  //     };
  //   }));

  //   return ordersWithDetails;
  // }

//   async create(order: Partial<Order>): Promise<Order> {
//     const orderItems = await Promise.all((order.items ?? []).map(async item => {
//       const orderItem = new this.orderItemModel(item);
//       return orderItem.save();
//     });

//     const newOrder = new this.orderModel({
//         ...order,
//         items: orderItems.map(item => item._id),
//     });

//     await newOrder.save();

//     return newOrder.toObject();
//   }

  
  
// }




// export class OrderRepository implements IOrderRepository {

//   private orderModel: Model<IOrderDocument>;
//   private orderItemModel: Model<IOrderItemDocument>;

//   constructor() {
//     this.orderModel = OrderModel;
//     this.orderItemModel = OrderItemModel;
//   }


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

  // async create(order: Partial<Order>): Promise<Order> {

    // const orderItems = await Promise.all((order.items ?? []).map(async item => {
    //   const orderItem = new this.orderItemModel(item);
    //   return orderItem.save();
    // }));


    // const newOrder = new this.orderModel({
    //     ...order,
    //     items: orderItems.map(item => item._id),
    // });


    // await newOrder.save();

    // return newOrder.toObject();
  // }

  // async findById(id: string): Promise<Order | null> {
  //   const order = await this.orderModel.findById(id).populate('items').exec();

  //   if (!order) {
  //     return null;
  //   }

  //   return order.toObject();
  // }

  // async findByUserId(userId: string): Promise<Order[]> {
  //   const orders = await this.orderModel.find({ userId }).populate('items').exec();

  //   return orders.map(order => order.toObject());
  // }

//   async update(order: Order): Promise<Order> {
    // const orderItems = await Promise.all(order.items.map(async item => {
    //   if (item.foodId) {
    //     return this.orderItemModel.findByIdAndUpdate(item.foodId, item, { new: true });
    //   }

    //   const orderItem = new this.orderItemModel(item);
    //   return orderItem.save();
    // }));

    // const updatedOrder = await this.orderModel.findByIdAndUpdate(order.id, {
    //   ...order,
    //   items: orderItems.map(item => item),
    // }, { new: true });

    // if (updatedOrder) {
    //   return updatedOrder.toObject();
    // } else {
    //   throw new Error("Failed to update order.");
    // }
//   }

  // async delete(id: string): Promise<void> {
  //   await this.orderModel.findByIdAndDelete(id);
  // }

//   async findAll(): Promise<Order[]> {
        // const orders = await this.orderModel.find().populate('items').exec();
        // return orders.map(order => order.toObject());
//   }   

// }

// Path: src/infrastructure/repositories/OrderItemRepository.ts
// this repository is responsible for handling the OrderItem entity



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
      { $match: { user_id: userId } },
      {
        $lookup: {
          from: 'orderitems',
          localField: '_id',
          foreignField: 'order_id',
          as: 'items'
        }
      },  
    ]);

    return orders.map(order => order.toObject());
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