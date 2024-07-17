import { Categorie } from "../entities/Categorie";



export interface ICategorieRepository {
    create(categorie: Partial<Categorie>): Promise<Categorie>;
    getAllCategories(): Promise<Categorie[]>;
    fetch(id: string): Promise<Categorie | null>;
    fetchByName(name: string): Promise<Categorie | null>;
    getCategoriesByRestaurent(id: string): Promise<Categorie[]>;
}