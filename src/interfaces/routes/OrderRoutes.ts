import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { OrderItemRepository, OrderRepository } from "../../infrastructure/repositories/OrderRepository";
import verifyToken from "../../middleware/authMiddleware";



const router = Router();

const orderRepository = new OrderRepository();
const orderitemRepository = new OrderItemRepository();

const orderController = new OrderController(
    orderRepository,
    orderitemRepository
);

router.post('/', verifyToken , orderController.placeOrder.bind(orderController));
// router.get('/orders', orderController.getOrders.bind(orderController));
// router.get('/orders/:id', orderController.getOrderById.bind(orderController));

router.get('/user/:userId', orderController.getOrdersByUserId.bind(orderController));
router.get('/user/:userId/pagination', orderController.getOrdersByUserWithPagination.bind(orderController));
// router.put('/orders', orderController.updateOrder.bind(orderController));


export default router;
