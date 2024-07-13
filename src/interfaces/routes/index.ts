import { Router } from "express";
import authRoutes from "./AuthRoutes";
import foodRoutes from "./FoodRoutes";
import syncRoutes from "./SyncRoutes";
import bannerRoutes from "./BannerRoutes";
import userRoutes from "./UserRoutes";
// import orderRoutes from "./OrderRoutes";



const routes = Router();


// routes
routes.use('/auth', authRoutes);
routes.use('/food', userRoutes);
routes.use('/sync', syncRoutes);
routes.use('/banner', bannerRoutes);


export default routes;