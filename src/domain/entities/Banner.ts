

export interface Banner {
    // id : string;
    _id?: string;
    title: string;
    description: string;
    image?: string;
    url? : string;
    status: number;
    expiresAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}



