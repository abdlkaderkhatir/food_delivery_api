import { Document, model, Schema } from "mongoose";
import { Item } from "../../domain/entities/Item";


export interface IItemDocument extends Document , Omit<Item, '_id'> {}


const ItemSchema = new Schema({
    restaurant_id: { type: Schema.Types.ObjectId as any, ref: 'Restaurent', required: true },
    category_id: { type: Schema.Types.ObjectId as any, ref: 'Categorie', required: true },
    name: { type: String, required: true , default: '' },
    price: { type: Number, required: true , default: 0 },
    description: { type: String, required: false , default: '' },
    image: { type: String, required: true , default: '' },
    status: { type: String, required: true , default: 'active' },
    createdAt: { type: Date, required: true , default: Date.now },
    updatedAt: { type: Date, required: true , default: Date.now },
});

// status : active | inactive


export const ItemModel = model<IItemDocument>('Item', ItemSchema);