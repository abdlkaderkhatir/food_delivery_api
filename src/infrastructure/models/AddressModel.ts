import { Document, model, Schema } from "mongoose";
import { Address } from "../../domain/entities/Address";


export interface IAdressDocument extends Document, Omit<Address, '_id'> {}


const AddressSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId as any, ref: 'User', required: true },
    street: { type: String, required: false , default: '' },
    city: { type: String, required: true , default: '' },
    state: { type: String, required: false , default: '' },
    country: { type: String, required: false , default: '' },
    zip: { type: String, required: false , default: '' },
    latitude: { type: Number, required: true , default: 0 },
    longitude: { type: Number, required: true , default: 0 },
    createdAt: { type: Date, required: true , default: Date.now },
    updatedAt: { type: Date, required: true , default: Date.now },
});


export const AddressModel = model<IAdressDocument>('Address', AddressSchema);