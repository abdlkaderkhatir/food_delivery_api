import { Model } from "mongoose";
import { ICategorieRepository } from "../../domain/repositories/ICategorieRepository";
import { CategorieModel, ICategorieDocument } from "../models/CategorieModel";
import { Categorie } from "../../domain/entities/Categorie";



export class CategorieRepository implements ICategorieRepository {

    private categorieModel: Model<ICategorieDocument>;

    constructor() {
        this.categorieModel = CategorieModel;
    }

    async create(categorie: Partial<Categorie>): Promise<Categorie> {
        // return this.categorieModel.create(categorie)
        const newCategorie = new this.categorieModel(categorie);
        await newCategorie.save();
        return newCategorie.toObject() as Categorie;
    }

    async getAllCategories(): Promise<Categorie[]> {
        // return this.categorieModel.find().exec();
        const categories = await this.categorieModel.find();
        return categories as Categorie[];
        // return categories.map((categorie: any) => {
        //     return {
        //         ...categorie,
        //         _id: categorie._id.toString()
        //     } as Categorie;
        // });
    }

    async fetch(id: string): Promise<Categorie | null> {
        // return this.categorieModel.findById(id).exec();
        const categorie = await this.categorieModel
            .findById(id)
            .lean()
            .exec();
        if (categorie) {
            return {
                ...categorie,
                _id: categorie._id.toString()
            } as Categorie;
        }
        return null;
    }

    async fetchByName(name: string): Promise<Categorie | null> {
        // return this.categorieModel.findOne({ name }).exec();
        const categorie = await this.categorieModel
            .findOne({ name })
            .lean()
            .exec();

        if (categorie) {
            return {
                ...categorie,
                _id: categorie._id.toString()
            } as Categorie;
        }
        return null;
    }

    async getCategoriesByRestaurent(id: string): Promise<Categorie[]> {
        const categories = await this.categorieModel.find({ restaurant_id : id } , { __v : 0 }).populate('restaurant_id') // also can use { __v: 0 } { name: 1 , _id: 1 , restaurant_id: 1 }
        return categories as Categorie[];
    }

    async findCategoryByCatIdAndRestaurentId(category_id: string , restaurant_id: string): Promise<Categorie | null> {
        const categorie = await this.categorieModel.findOne({ _id: category_id , restaurant_id }).exec();
        if (categorie) {
            return categorie as Categorie;
        }
        return null;
    }
}