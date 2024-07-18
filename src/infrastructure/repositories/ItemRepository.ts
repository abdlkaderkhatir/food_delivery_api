import mongoose, { Model } from "mongoose";
import { Item } from "../../domain/entities/Item";
import { IItemRepository } from "../../domain/repositories/IItemRepository";
import { IItemDocument, ItemModel } from "../models/ItemModel";
import { Menu, MenuItem } from "../../domain/entities/Menu";



export class ItemRepository implements IItemRepository {

    private itemModel: Model<IItemDocument>;

    constructor() {
        this.itemModel = ItemModel;
    }

    async createItem(item: Item): Promise<Item> {
        const newItem = new this.itemModel(item);
        await newItem.save();
        return newItem.toObject() as Item;
    }


    async fetchItem(id: string): Promise<Item | null> {
        const item = await this.itemModel.findById(id);
        return item as Item | null;
    }

    async fetchItemByName(name: string): Promise<Item | null> {
        const item = await this.itemModel.findOne({ name });
        return item as Item | null;
    }


    async getItemsByRestaurent(id: string): Promise<Item[]> {
        const items = await this.itemModel.find({ restaurant_id: id }).exec();
        return items as Item[];
    }

    async getItems(): Promise<Item[]> {
        const items = await this.itemModel.find();
        return items as Item[];
    }


    async getItemsByCategory(id: string): Promise<Item[]> {
        const items = await this.itemModel.find({ category_id: id });
        return items as Item[];
    }

    async updateItem(id: string, item: Item): Promise<Item> {
        const updatedItem = await this.itemModel.findByIdAndUpdate(id, item, {
            new: true
        });

        return updatedItem?.toObject() as Item;
    }

    async deleteItem(id: string): Promise<boolean> {
        const deletedItem = await this.itemModel.findByIdAndDelete(id);
        return !!deletedItem;
    }



    async getMenuByRestaurent(id: string): Promise<Menu> {
        const items = await this.itemModel.aggregate([
            {
                $match: {
                    restaurant_id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            // {
            //     $lookup: {
            //         from: "restaurants",
            //         localField: "restaurant_id",
            //         foreignField: "_id",
            //         as: "restaurant"
            //     }
            // },
            // {
            //     $unwind: "$restaurant"
            // },
            {
                $group: {
                    _id: "$category_id",
                    category: { $first: "$category" }, // $first is used to get the first document in the group
                    // restaurant: { $first: "$restaurant" },
                    // items: { $push: "$$ROOT" } // $$ROOT is the document itself with all fields and values in it 
                    items : { $push : 
                        {
                            _id : "$_id",
                            name : "$name",
                            price : "$price",
                            description : "$description",
                            category_id : "$category_id",
                            restaurant_id : "$restaurant_id",
                            image : "$image"
                        }
                    
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    // category_id: "$_id",
                    category_name: "$category.name",
                    items: 1
                }
            }
        ]);
        return items as Menu;
    }
}