import { Router } from "express";
import authRoutes from "./AuthRoutes";
import foodRoutes from "./FoodRoutes";
import syncRoutes from "./SyncRoutes";
import bannerRoutes from "./BannerRoutes";
import userRoutes from "./UserRoutes";
import restaurentRoutes from "./RestaurentRoutes";
import categoryRoutes from "./CategorieRoutes";
import itemRoutes from "./ItemRoutes";
// import orderRoutes from "./OrderRoutes";



const routes = Router();


// routes
routes.use('/auth', authRoutes);
routes.use('/foods', userRoutes);
routes.use('/sync', syncRoutes);
routes.use('/banners', bannerRoutes);
routes.use('/restaurents', restaurentRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/items', itemRoutes);



export default routes;