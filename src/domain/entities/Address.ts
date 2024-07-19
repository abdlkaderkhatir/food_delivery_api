

export interface Address {
    _id: string;
    user_id: string;
    street?: string;
    city: string;
    state?: string;
    country?: string;
    zip?: string;
    latitude: number;
    longitude: number;
    createdAt: Date;
    updatedAt: Date;
}