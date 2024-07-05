import { Document, Schema, model } from "mongoose";
import { Food } from "../../domain/entities/Food";


// const FoodSchema = new Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String, required: true },
//     category: { type: String, required: true },
//     image: { type: String, required: true },
//   });
  
//   export const FoodModel = model('Food', FoodSchema);


export interface IFoodDocument extends Document , Omit<Food, 'id'> {}

const FoodSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

export const FoodModel = model<IFoodDocument>('Food', FoodSchema);