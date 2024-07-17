import { Document, model, ObjectId, Schema } from "mongoose";
import { Categorie } from "../../domain/entities/Categorie";


export interface ICategorieDocument extends Document , Omit<Categorie, '_id'> {
    // _id: ObjectId;
}


const CategorieSchema = new Schema({
    restaurant_id: { type: Schema.Types.ObjectId as any, ref: 'Restaurent', required: true },
    name: { type: String, required: true , default: '' },
    createdAt: { type: Date, required: true , default: Date.now },
    updatedAt: { type: Date, required: true , default: Date.now },
});


export const CategorieModel = model<ICategorieDocument>('Categorie', CategorieSchema);