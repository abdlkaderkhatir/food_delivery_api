

export interface Address {
    _id: string;
    user_id: string;
    address: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    latitude: number;
    longitude: number;
    createdAt: Date;
    updatedAt: Date;
}