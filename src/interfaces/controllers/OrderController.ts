import { OrderUseCases } from "../../application/use-cases/OrdreUseCases";
import { CustomRequest } from "../../domain/entities/custumeRequest";
import { IOrderItemRepository, IOrderRepository } from "../../domain/repositories/IOrderRepository";
// import { OrderRepository } from "../../infrastructure/repositories/OrderRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { Request, Response } from "express";



export class OrderController {

//     private orderUseCase: OrderUseCases;
    
    constructor(
        private orderRepository: IOrderRepository,
        private orderItemRepository: IOrderItemRepository
    ) {}

    
    async placeOrder(req: CustomRequest , res: Response) {
        try {
            const orderData = {
                user_id: req.user.id,
                restaurant_id: req.body.restaurant_id,
                status: req.body.status,
                total_price: req.body.total_price,
                delivery_fee: req.body.delivery_fee,
                grand_total: req.body.grand_total,
                delivery_address: req.body.delivery_address,
                payment_method: req.body.payment_method,
                payment_status: req.body.payment_status,
                instructions: req.body.instructions,
            }
            const order = await this.orderRepository.createOrder(orderData);
            const orderItems = await Promise.all((req.body.items ?? []).map(async (item: any) => {
                const orderItemData = {
                    order_id: order._id,
                    item_id: item.item_id,
                    quantity: item.quantity,
                    price: item.price,
                }
                return await this.orderItemRepository.create(orderItemData);
            }));
            order.items = orderItems;
            res.status(201).json(order);
        } catch (error : any) {
            res.status(400).json({ message: error.message });
        }
    }


    async getOrdersByUserId(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const orders = await this.orderRepository.findOrdersByUserId(userId);
            res.status(200).json(orders);
        } catch (error : any) {
            res.status(400).json({ message: error.message });
        }
    }
   
}
