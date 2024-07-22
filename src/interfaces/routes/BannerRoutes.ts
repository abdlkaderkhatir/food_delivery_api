import { Router } from "express";
import { BannerController } from "../controllers/BannerController";
import { BannerRepository } from "../../infrastructure/repositories/BannerRepository";
import verifyToken from "../../middleware/authMiddleware";
import adminRole from "../../middleware/adminRole";
import {Utils} from "../../utils/utils";


const router = Router();
const bannerRepo = new BannerRepository();
const bannerController = new BannerController(bannerRepo);


router.post('/create', verifyToken , adminRole , Utils.upload.single('image') , bannerController.createBanner.bind(bannerController));
router.put('/update', bannerController.updateBanner.bind(bannerController));
router.delete('/delete/:id', bannerController.deleteBanner.bind(bannerController));
router.get('/get/:id', bannerController.getBanner.bind(bannerController));
router.get('/getAll', bannerController.getAllBanners.bind(bannerController));
router.put('/change-status/:id', bannerController.changeStatus.bind(bannerController));
router.get('/get-active', bannerController.getActiveBanners.bind(bannerController));


export default router;