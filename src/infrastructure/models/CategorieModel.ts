import { Document, model, Schema } from "mongoose";
import { Categorie } from "../../domain/entities/Categorie";


export interface ICategorieDocument extends Document , Omit<Categorie, '_id'> {}


const CategorieSchema = new Schema({
    restaurant_id: { type: Number, required: true , default: 0 },
    name: { type: String, required: true , default: '' },
    createdAt: { type: Date, required: true , default: Date.now },
    updatedAt: { type: Date, required: true , default: Date.now },
});


export const CategorieModel = model<ICategorieDocument>('Categorie', CategorieSchema);