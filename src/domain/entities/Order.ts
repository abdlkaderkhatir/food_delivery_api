

export interface OrderItem {
    id: string;
    orderId: string;
    foodId: string;
    quantity: number;
    price: number;
}


export interface Order {
    id: string;
    userId: string;
    // items: OrderItem[];
    status: 'pending' | 'completed' | 'cancelled';
    total: number;
    createdAt: Date;
    updatedAt: Date;
}