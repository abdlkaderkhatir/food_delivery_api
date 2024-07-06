import { Order } from "../../domain/entities/Order";
import { IFoodRepository } from "../../domain/repositories/IFoodRepository";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";


export class OrderUseCases {
    constructor(private orderRepository: IOrderRepository , private userRepo: IUserRepository , private foodRepo: IFoodRepository) {
        // this.orderRepository = orderRepository;
    }

    async calculateTotal(order: Order): Promise<number> {
        let total = 0;
        for (const item of order.items) {
            const food = await this.foodRepo.findById(item.foodId);
            if (food) {
                total += food.price * item.quantity;
            }
        }
        return total;
    }

    async createOrder(order: Partial<Order>): Promise<Order> {
        try {
            const user = await this.userRepo.findById(order.userId!);
            if (!user) {
                throw new Error('User not found');
            }
            const total = await this.calculateTotal(order as Order);
            const newOrder = await this.orderRepository.create(
                {
                    ...order,
                    total,
                    status: 'pending',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            );
            return newOrder;
        } catch (error) {
            throw new Error('Failed to create order');
        }
    }

    async getOrders(): Promise<Order[]> {
        return await this.orderRepository.findAll();
    }

    // get Orders with details

    async getOrdersWithDetails(userId: string): Promise<any[]> {
        const orders = await this.orderRepository.findByUserId(userId);
        const ordersWithDetails = await Promise.all(orders.map(async order => {
            const items = await Promise.all(order.items.map(async item => {
                const food = await this.foodRepo.findById(item.foodId);
                return {
                    ...item,
                    food,
                };
            }));
            return {
                ...order,
                items,
            };
        }));
        return ordersWithDetails;
    }


    // async getAllOrdersWithDetails(): Promise<any[]> {
    //     const orders = await this.orderRepository.findAll();
    //     const ordersWithDetails = await Promise.all(orders.map(async order => {
    //         const items = await Promise.all(order.items.map(async item => {
    //             const food = await this.foodRepo.findById(item.foodId);
    //             return {
    //                 ...item,
    //                 food,
    //             };
    //         }));
    //         return {
    //             ...order,
    //             items,
    //         };
    //     }));
    //     return ordersWithDetails;
    // }


    async getOrderById(id: string): Promise<Order | null> {
        return await this.orderRepository.findById(id);
    }

    async getOrdersByUserId(userId: string): Promise<Order[]> {
        return await this.orderRepository.findByUserId(userId);
    }

    async updateOrder(order: Order): Promise<Order> {
        return await this.orderRepository.update(order);
    }

    async deleteOrder(id: string): Promise<void> {
        return await this.orderRepository.delete(id);
    }
}