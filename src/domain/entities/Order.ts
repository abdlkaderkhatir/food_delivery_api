

export interface Order {
    _id: string;
    user_id: string;
    restaurant_id: string;
    items?: OrderItem[];
    status: 'pending' | 'completed' | 'cancelled';
    total_price: number;
    delivery_fee: number;
    grand_total: number;
    delivery_address: string;
    payment_method: 'cash' | 'card';
    payment_status: 'paid' | 'unpaid';
    instructions: string;
    createdAt: Date;
    updatedAt: Date;
}



export interface OrderItem {
    _id: string;
    order_id: string;
    item_id: string; // food id
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}