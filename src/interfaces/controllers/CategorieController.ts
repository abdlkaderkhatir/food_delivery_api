import { Request, Response } from "express";
import { Categorie } from "../../domain/entities/Categorie";
import { ICategorieRepository } from "../../domain/repositories/ICategorieRepository";


export class CategoriesController {
  constructor(private categorieRepo: ICategorieRepository) {}

  async createCategory(req: Request, res: Response) {
    try {
      const categoryData = req.body;
      const category = await this.categorieRepo.create(categoryData as Partial<Categorie>);
      res.status(201).json(category);
    } catch (error : any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await this.categorieRepo.getAllCategories();
      res.status(200).json(categories);
    } catch (error : any) {
      res.status(400).json({ message: error.message });
    }
  }


  async getCategoryByRestaurent(req: Request, res: Response) {
    try {
      const categories = await this.categorieRepo.getCategoriesByRestaurent(req.params.id);
      res.status(200).json(categories);
    } catch (error : any) {
      res.status(400).json({ message: error.message });
    }
  }

//   async getCategory(req: Request, res: Response) {
//     try {
//       const category = await this.categoriesService.getCategory(req.params.id);
//       res.status(200).json(category);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   async updateCategory(req: Request, res: Response) {
//     try {
//       const category = await this.categoriesService.updateCategory(req.params.id, req.body);
//       res.status(200).json(category);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   async deleteCategory(req: Request, res: Response) {
//     try {
//       await this.categoriesService.deleteCategory(req.params.id);
//       res.status(204).end();
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }
}