import { Request, Response } from "express";
import { IItemRepository } from "../../domain/repositories/IItemRepository";
import { IRestaurentRepository } from "../../domain/repositories/IRestaurentRepository";
import { ICategorieRepository } from "../../domain/repositories/ICategorieRepository";


export class ItemController {

  constructor(
    private itemRepo : IItemRepository , 
    private restaurentRepo : IRestaurentRepository , 
    private categorieRepo : ICategorieRepository
    ) {}

  async createItem(req: Request, res: Response) {
    try {

        console.log('[file]', req.file);
        

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        // check restaurant_id and category_id
        const restaurant = await this.restaurentRepo.fetchOne(req.body.restaurant_id);
        if (!restaurant) {
            return res.status(400).json({ message: "Restaurant not found" });
        }

        const category = await this.categorieRepo.findCategoryByCatIdAndRestaurentId(req.body.category_id , req.body.restaurant_id);
        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }
        
        const path = req.file.path;
        const image = path.replace(/\\/g, "/");
        const itemData = {
            name: req.body.name ?? "",
            description: req.body.description ?? "",
            price: parseFloat(req.body.price),
            category_id: req.body.category_id,
            restaurant_id: req.body.restaurant_id,
            image : path,
            status: req.body.status
        }

        const item = await this.itemRepo.fetchItemByName(itemData.name);
        if (item) {
            return res.status(400).json({ message: "Item already exists" });
        }

        const newItem = await this.itemRepo.createItem(itemData);

        res.status(201).json({
            ...newItem,
            image: `${req.protocol}://${req.get("host")}/${image}`
        });
        
    } catch (error : any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getItems(req: Request, res: Response) {
    try {
        const items = await this.itemRepo.getItems();
        res.status(200).json(items);
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
  }

    async getItem(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const item = await this.itemRepo.fetchItem(id);
            if (!item) {
                return res.status(404).json({ message: "Item not found" });
            }
            res.status(200).json(item);
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }


    async updateItem(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const itemData = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category_id: req.body.category_id,
                restaurant_id: req.body.restaurant_id,
                image: req.body.image,
                status: req.body.status
            }

            const item = await this.itemRepo.updateItem(id, itemData);
            if (!item) {
                return res.status(404).json({ message: "Item not found" });
            }
            res.status(200).json(item);
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }


    async deleteItem(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const deleted = await this.itemRepo.deleteItem(id);
            if (!deleted) {
                return res.status(404).json({ message: "Item not found" });
            }
            res.status(204).json();
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

}