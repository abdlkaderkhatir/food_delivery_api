
export interface Restaurent {
    _id: string;
    user_id: string;
    city_id: string;
    name: string;
    location: string;
    city: string;
    country: string;
    longitude?: number;
    latitude?: number;
    status: string;
    cousines: string[];
    delivery_time: string;
    delivery_fee: number;
    rating: number;
    total_rating: number;
    open_time: string;
    close_time: string;
    createdAt: Date;
    updatedAt: Date;
}