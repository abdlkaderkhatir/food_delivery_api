import { OrderUseCases } from "../../application/use-cases/OrdreUseCases";
import { FoodRepository } from "../../infrastructure/repositories/FoodRepository";
import { OrderRepository } from "../../infrastructure/repositories/OrderRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { Request, Response } from "express";



export class OrderController {

    private orderUseCase: OrderUseCases;
    
    constructor( ) {
        const orderRepository = new OrderRepository();
        const userRepo = new UserRepository();
        const foodRepo = new FoodRepository();

        this.orderUseCase = new OrderUseCases(
            orderRepository,
            userRepo,
            foodRepo
        );
    }

    


    async createOrder(req: Request, res: Response) {
        try {
            const order = req.body;
            const newOrder = await this.orderUseCase.createOrder(order);
            res.status(201).json(newOrder);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getOrders(req: Request, res: Response) {
        try {
            const orders = await this.orderUseCase.getOrders();
            res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async getOrderById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const order = await this.orderUseCase.getOrderById(id);
            res.status(200).json(order);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async getOrdersByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const orders = await this.orderUseCase.getOrdersByUserId(userId);
            res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async updateOrder(req: Request, res: Response) {
        try {
            const order = req.body;
            const updatedOrder = await this.orderUseCase.updateOrder(order);
            res.status(200).json(updatedOrder);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    // get Orders with details

    async getOrdersWithDetails(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const orders = await this.orderUseCase.getOrdersWithDetails(userId);
            res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    
   
}
