import { model, Schema } from "mongoose";
import { Restaurent } from "../../domain/entities/Restaurent";


export interface IRestaurentDocument extends Document, Omit<Restaurent, '_id' | 'location'> {}


const RestaurentSchema = new Schema({
    user_id: { type: String, required: true, default: '' },
    city_id: { type: String, required: true, default: '' },
    name: { type: String, required: true, default: '' },
    location: { type: String, required: true, default: '' },
    city: { type: String, required: true, default: '' },
    country: { type: String, required: false, default: '' },
    longitude: { type: Number, required: false, default: 0 },
    latitude: { type: Number, required: false, default: 0 },
    status: { type: String, required: true, default: 'active' },
    cousines: { type: [String], required: true, default: [] },
    delivery_time: { type: String, required: true, default: '' },
    delivery_fee: { type: Number, required: false, default: 0 },
    rating: { type: Number, required: false, default: 0 },
    total_rating: { type: Number, required: false, default: 0 },
    open_time: { type: String, required: true, default: '' },
    close_time: { type: String, required: true, default: '' },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});


export const RestaurentModel = model<IRestaurentDocument>('Restaurent', RestaurentSchema);
