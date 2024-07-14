import { Restaurent } from "../entities/Restaurent";


export interface IRestaurentRepository {
    create(restaurent: Partial<Restaurent>): Promise<Restaurent>;
    getAllRestaurents(): Promise<Restaurent[]>;
    fetchOne(id: string): Promise<Restaurent | null>;
}