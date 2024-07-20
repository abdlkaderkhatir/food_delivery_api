import axios from 'axios'; // Import the 'axios' library

import { Item } from "../../domain/entities/Item";
import { ItemRepository } from "../../infrastructure/repositories/ItemRepository";

const syncWithDataServer = async () : Promise<void> => {
    try {
        const itemRepository = new ItemRepository();
        const { data: foods } = await axios.get<Item[]>('http://localhost:3000/sync');

       // Example: Update local database with synchronized data
        await Promise.all(foods.map(async (food: Item) => {
            const existingFood = await itemRepository.fetchItem(food._id);
            if (existingFood) {
            await itemRepository.updateItem(food._id ,food);
            } else {
            await itemRepository.createItem(food);
            }
        }));
    } catch (error : any) {
        console.log('Error syncing with data server: ', error.message);
    }
}


export default syncWithDataServer;