import { City } from "../entities/City";

export interface ICityRepository {
    create(city: Partial<City>): Promise<City>;
    update(city: Partial<City>): Promise<City | null>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<City | null>;
    getAllCities(): Promise<City[]>;
    changeStatus(id: string, status: string): Promise<City | null>;
    getActiveCities(): Promise<City[]>;
    getInactiveCities(): Promise<City[]>;
}