import { Document, model, ObjectId, Schema } from "mongoose";
import { Banner } from "../../domain/entities/Banner";



export interface IBannerDocument extends Document , Omit<Banner, '_id'> {
  _id: ObjectId;
}


const BannerSchema = new Schema({
  title: { type: String, required: true , default: '' },
  description: { type: String, required: true , default: '' },
  image: { type: String, required: true },
  url: { type: String, required: false  , default: '' },
  status: { type: Number, required: true , default: 1 },
  expiresAt: { type: Date, required: true , default: Date.now },
});

// add pre

BannerSchema.pre('save', function (next) {
    if (this.expiresAt <= new Date()) {
        // this.isActive = false;
        this.status = 2;
    }
    next();
});


export const BannerModel = model<IBannerDocument>('Banner', BannerSchema);