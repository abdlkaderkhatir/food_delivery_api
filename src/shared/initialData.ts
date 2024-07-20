// import { Food } from "../domain/entities/Food";
// import { FoodRepository } from "../infrastructure/repositories/FoodRepository";


// const initialFoods: Partial<Food>[] = [
//   {
//     name: 'Pizza Margherita',
//     description: 'Classic pizza with tomatoes, mozzarella, and basil',
//     price: 8.5,
//     category: 'Pizza',
//     image: 'https://images.unsplash.com/photo-1565299628271-0e6a3f8fcd0d',
//   },
//   {
//     name: 'Burger',
//     description: 'Juicy beef burger with lettuce, tomato, and cheese',
//     price: 5.5,
//     category: 'Fast Food',
//     image: 'https://images.unsplash.com/photo-1603349036314-6b1b7a1f7b3d',
//   },
//   {
//     name: 'Caesar Salad',
//     description: 'Fresh salad with romaine lettuce, croutons, and Caesar dressing',
//     price: 4.0,
//     category: 'Salad',
//     image: 'https://images.unsplash.com/photo-1565299628271-0e6a3f8fcd0d'
//   }
// ];



// export const populateInitialData = async (): Promise<void> => {
//     const foodRepository = new FoodRepository();
//     try {
//       const foods = await foodRepository.getAllFoods();
//       if (foods.length === 0) {
//         console.log('No food items found, populating initial data...');
//         for (const food of initialFoods) {
//           await foodRepository.create(food as Food);
//         }
//         console.log('Initial food items created.');
//       } else {
//         console.log('Food items already exist, skipping initial data population.');
//       }
//     } catch (error) {
//       console.error('Error populating initial data:', error);
//     }
// };

