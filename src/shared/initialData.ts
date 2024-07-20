import { Item } from "../domain/entities/Item";
import { ItemRepository } from "../infrastructure/repositories/ItemRepository";


const initialFoods: Partial<Item>[] = [
  {
    name: 'Pizza Margherita',
    restaurant_id: '1',
    category_id : '1',
    description: 'Classic pizza with tomatoes, mozzarella, and basil',
    price: 8.5,
    status: 1,
    image: 'https://images.unsplash.com/photo-1565299628271-0e6a3f8fcd0d',
  },
  {
    name: 'Burger',
    restaurant_id: '1',
    category_id : '1',
    description: 'Juicy beef burger with lettuce, tomato, and cheese',
    price: 5.5,
    status: 1,
    image: 'https://images.unsplash.com/photo-1603349036314-6b1b7a1f7b3d',
  },
  {
    name: 'Caesar Salad',
    restaurant_id: '1',
    category_id : '1',
    description: 'Fresh salad with romaine lettuce, croutons, and Caesar dressing',
    price: 4.0,
    status: 1,
    image: 'https://images.unsplash.com/photo-1565299628271-0e6a3f8fcd0d'
  }
];



export const populateInitialData = async (): Promise<void> => {
    const itemRepository = new ItemRepository();
    try {
      const foods = await itemRepository.getItems();
      if (foods.length === 0) {
        console.log('No food items found, populating initial data...');
        for (const food of initialFoods) {
          await itemRepository.createItem(food as Item);
        }
        console.log('Initial food items created.');
      } else {
        console.log('Food items already exist, skipping initial data population.');
      }
    } catch (error) {
      console.error('Error populating initial data:', error);
    }
};

