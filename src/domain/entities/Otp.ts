
export interface Otp {
    id: string;
    userId : string;
    otp: number;
    expiresAt: Date;
}