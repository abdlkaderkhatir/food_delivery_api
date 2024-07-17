import { Model } from "mongoose";
import { Item } from "../../domain/entities/Item";
import { IItemRepository } from "../../domain/repositories/IItemRepository";
import { IItemDocument, ItemModel } from "../models/ItemModel";



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


    

}