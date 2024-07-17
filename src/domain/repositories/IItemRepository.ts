import { Item } from "../entities/Item";



export interface IItemRepository {
    createItem(item: Partial<Item>): Promise<Item>;
    fetchItem(id: string): Promise<Item | null>;
    fetchItemByName(name: string): Promise<Item | null>;
    getItemsByRestaurent(id: string): Promise<Item[]>;
    getItemsByCategory(id: string): Promise<Item[]>;
    getItems(): Promise<Item[]>;
    updateItem(id: string, item: Partial<Item>): Promise<Item>;
    deleteItem(id: string): Promise<boolean>;
}