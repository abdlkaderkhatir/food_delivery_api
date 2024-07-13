import { Banner } from "../entities/Banner";


export interface IBannerRepository {
    create(banner: Banner): Promise<Banner>;
    update(banner: Banner): Promise<Banner>;
    delete(id: string): Promise<boolean>;
    // findAll(): Promise<Banner[]>;
    findById(id: string): Promise<Banner | null>;
    getAllBanners(): Promise<Banner[]>;
    changeStatus(id: string, status: number): Promise<Banner | null>;
    getActiveBanners(): Promise<Banner[]>;
    getInactiveBanners(): Promise<Banner[]>;
}

// status 0: inactive, 1: active, 2: expired