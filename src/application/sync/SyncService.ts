// import axios from 'axios'; // Import the 'axios' library

// import { Food } from "../../domain/entities/Food";
// import { FoodRepository } from "../../infrastructure/repositories/FoodRepository";

// const syncWithDataServer = async () : Promise<void> => {
//     try {
//         const foodRepository = new FoodRepository();
//         const { data: foods } = await axios.get<Food[]>('http://localhost:3000/sync');

//        // Example: Update local database with synchronized data
//         await Promise.all(foods.map(async (food: Food) => {
//             const existingFood = await foodRepository.findById(food.id);
//             if (existingFood) {
//             await foodRepository.update(food);
//             } else {
//             await foodRepository.create(food);
//             }
//         }));
//     } catch (error : any) {
//         console.log('Error syncing with data server: ', error.message);
//     }
// }


// export default syncWithDataServer;