

export interface OrderItem {
    foodId: string;
    quantity: number;
}


export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    status: 'pending' | 'completed' | 'cancelled';
    total: number;
    createdAt: Date;
    updatedAt: Date;
}