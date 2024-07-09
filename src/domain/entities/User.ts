export interface User {
    _id: string;
    name?: string;
    email: string;
    password: string;
    id: string;
    role?: string;
    status?: string;
    phone?: string;
    emailVerified?: boolean;
    createdAt: Date;
    updatedAt: Date;
}