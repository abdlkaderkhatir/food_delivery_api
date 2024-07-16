import { Document, model, Schema } from "mongoose";
import { User } from "../../domain/entities/User";


export interface IUserDocument extends Document , Omit<User, '_id'> {}


const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  passwordResetToken: { type: String, required: false },
  passwordResetExpires: { type: Date, required: false },
  phone : { type: String, required: true },
  emailVerified: { type: Boolean, required: true },
  role: { type: String, required: true },
  status: { type: String, required: true },
});

// i need when return user remive _id and __v and rename _id to id

// UserSchema.set('toJSON', {
//   transform: function (doc, ret) {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//   }
// });


export const UserModel = model<IUserDocument>('User', UserSchema);