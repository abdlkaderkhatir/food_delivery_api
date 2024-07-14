import { Router } from "express";
import authRoutes from "./AuthRoutes";
import foodRoutes from "./FoodRoutes";
import syncRoutes from "./SyncRoutes";
import bannerRoutes from "./BannerRoutes";
import userRoutes from "./UserRoutes";
import restaurentRoutes from "./RestaurentRoutes";
// import orderRoutes from "./OrderRoutes";



const routes = Router();


// routes
routes.use('/auth', authRoutes);
routes.use('/foods', userRoutes);
routes.use('/sync', syncRoutes);
routes.use('/banners', bannerRoutes);
routes.use('/restaurents', restaurentRoutes);



export default routes;