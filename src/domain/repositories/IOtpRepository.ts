import { Otp } from "../entities/Otp";

export interface IOtpRepository {
    create(otp: Partial<Otp>): Promise<Otp>;
    update(otp: Otp): Promise<Otp>;
    delete(id: string): Promise<boolean>;
    findByOtp(otpValue: string): Promise<Otp | null>;
    findById(id: string): Promise<Otp | null>;
    getAllOtps(): Promise<Otp[]>;

    deleteByUserId(userId: string): Promise<boolean>;
    findByUserId(userId: string): Promise<Otp | null>;
}