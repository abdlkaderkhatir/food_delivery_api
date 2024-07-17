

export interface Item {
    _id: string;
    restaurant_id: string;
    category_id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}