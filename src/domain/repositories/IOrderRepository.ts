import { Order, OrderItem } from "../entities/Order";



export interface IOrderRepository {
    create(order: Partial<Order>): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    findByUserId(userId: string): Promise<Order[]>;
    update(order: Order): Promise<Order>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Order[]>;
}


export interface IOrderItemRepository {
  create(orderItemData: Partial<OrderItem>): Promise<OrderItem>;
  findByOrderId(orderId: string): Promise<OrderItem[]>;
}