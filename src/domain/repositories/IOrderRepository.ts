import { Order, OrderItem } from "../entities/Order";



export interface IOrderRepository {
    createOrder(order: Partial<Order>): Promise<Order>;
    updateOrder(order: Partial<Order>): Promise<Order>;
    deleteOrder(orderId: string): Promise<boolean>;
    findOrderById(orderId: string): Promise<Order | null>;
    findOrdersByUserId(userId: string): Promise<Order[]>;
    // findOrdersByStatus(status: string): Promise<Order[]>;
    // findOrdersByRestaurantId(restaurantId: string): Promise<Order[]>;
}


export interface IOrderItemRepository {
  create(orderItemData: Partial<OrderItem>): Promise<OrderItem>;
  findByOrderId(orderId: string): Promise<OrderItem[]>;
  deleteItemsByOrderId(orderId: string): Promise<boolean>;
}