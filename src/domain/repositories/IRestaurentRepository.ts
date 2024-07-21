import { Restaurent } from "../entities/Restaurent";


export interface IRestaurentRepository {
    create(restaurent: Partial<Restaurent>): Promise<Restaurent>;
    getAllRestaurents(): Promise<Restaurent[]>;
    fetchOne(id: string): Promise<Restaurent | null>;
    fetchByName(name: string): Promise<Restaurent | null>;
    getNearRestaurents(lat: string, long: string): Promise<Restaurent[]>;
    searchRestaurents(search: string): Promise<Restaurent[]>;
    getAllRestaurentsPagination(page: number, limit: number): Promise<Restaurent[]>;
    countRestaurents(): Promise<number>;
}