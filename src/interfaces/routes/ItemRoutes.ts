import { Router } from "express";
import { ItemRepository } from "../../infrastructure/repositories/ItemRepository";
import { ItemController } from "../controllers/ItemController";
import { CategorieRepository } from "../../infrastructure/repositories/CategorieRepository";
import { RestaurentRepository } from "../../infrastructure/repositories/RestaurentRepository";
import { Utils } from "../../shared/utils/utils";



const router = Router();


const itemRepo = new ItemRepository();
const restaurentRepo = new RestaurentRepository();
const categorieRepo = new CategorieRepository();

const itemController = new ItemController(itemRepo , restaurentRepo , categorieRepo);


router.post("/create-item", Utils.upload.single('image'), itemController.createItem.bind(itemController));

router.get("/", itemController.getItems.bind(itemController));

router.get("/test", itemController.test.bind(itemController));

router.get("/:id", itemController.getItem.bind(itemController));

router.put("/:id", itemController.updateItem.bind(itemController));


router.delete("/:id", itemController.deleteItem.bind(itemController));




export default router;