import { model, Schema } from "mongoose";
import { Otp } from "../../domain/entities/Otp";


export interface IOtpDocument extends Document , Omit<Otp, 'id'> {}


const OtpSchema = new Schema<IOtpDocument>({
  userId: { type: Schema.Types.ObjectId as any, ref: 'User', required: true },
  otp: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
});


export const OtpModel = model<IOtpDocument>('Otp', OtpSchema);