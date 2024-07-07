export interface User {
    name?: string;
    email: string;
    password: string;
    id: string;
    role?: string;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
}