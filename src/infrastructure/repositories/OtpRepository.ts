import { Model } from "mongoose";
import { IOtpDocument, OtpModel } from "../models/OtpModel";
import { Otp } from "../../domain/entities/Otp";
import { IOtpRepository } from "../../domain/repositories/IOtpRepository";


export class OtpRepository implements IOtpRepository {
        
            private otpModel: Model<IOtpDocument>;
        
            constructor() {
                this.otpModel = OtpModel;
            }
        
            async create(otp: Partial<Otp>): Promise<Otp> {
                const newOtp = new this.otpModel(otp);
                await newOtp.save();
                return newOtp.toObject() as Otp;
            }
        
            async update(otp: Otp): Promise<Otp> {
                const updatedOtp = await this.otpModel.findByIdAndUpdate(otp.id, otp, { new: true });
                return updatedOtp as Otp;
            }
        
            async delete(id: string): Promise<boolean> {
                const deletedOtp = await this.otpModel.findByIdAndDelete(id);
                return !!deletedOtp;
            }
        
            async findByOtp(otpValue: string): Promise<Otp | null> {
                const otp = await this.otpModel.findOne({ otpValue });
                return otp as Otp | null;
            }
        
            async findById(id: string): Promise<Otp | null> {
                const otp = await this.otpModel.findById(id);
                return otp as Otp | null;
            }
        
            async getAllOtps(): Promise<Otp[]> {
                const otps = await this.otpModel.find();
                return otps as Otp[];
            }

            async deleteByUserId(userId: string): Promise<boolean> {
                const deletedOtp = await this.otpModel.findOneAndDelete({ userId });
                return !!deletedOtp;
            }

            async findByUserId(userId: string): Promise<Otp | null> {
                const otp = await this.otpModel.findOne({ userId });
                return otp as Otp | null;
            }
        }