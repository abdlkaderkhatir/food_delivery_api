import { model, Schema } from "mongoose";
import { User } from "../../domain/entities/User";


export interface IUserDocument extends Document , Omit<User, 'id'> {}


const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone : { type: String, required: true },
  emailVerified: { type: Boolean, required: true },
  role: { type: String, required: true },
  status: { type: String, required: true },
});


export const UserModel = model<IUserDocument>('User', UserSchema);