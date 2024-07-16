import { Document, model, Schema } from "mongoose";
import { City } from "../../domain/entities/City";


export interface ICityDocument extends Document , Omit<City, '_id'> {}


const CitySchema = new Schema({
    name: { type: String, required: true , default: '' },
    country: { type: String, required: true , default: '' },
    longitude: { type: Number, required: true , default: 0 },
    latitude: { type: Number, required: true , default: 0 },
    status: { type: String, required: true , default: 'active' },
    createdAt: { type: Date, required: true , default: Date.now },
    updatedAt: { type: Date, required: true , default: Date.now },
});


export const CityModel = model<ICityDocument>('City', CitySchema);