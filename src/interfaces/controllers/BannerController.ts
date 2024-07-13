import { Request, Response } from "express";
import { Banner } from "../../domain/entities/Banner";
import { IBannerRepository } from "../../domain/repositories/IBannerRepository";


export class BannerController {
    constructor(private bannerRepository: IBannerRepository) { }

    async createBanner(req: Request, res: Response): Promise<Response> {
        try {
            const banner: Banner = req.body;
    
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }
    
            const path = req.file.path.replace(/\\/g, '/');
    
            // return res.status(200).send(path);

            const createdBanner = await this.bannerRepository.create({
                title: banner.title,
                description : banner.description,
                image: path,
                status: 1,
                url: '',
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                createdAt: new Date(),
                updatedAt: new Date()
            } as Banner);
            return res.status(201).json({
                ...createdBanner,
                image : `${req.protocol}://${req.get('host')}/${path}`
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateBanner(req: Request, res: Response): Promise<Response> {
        const banner: Banner = req.body;
        const updatedBanner = await this.bannerRepository.update(banner);
        return res.status(200).json(updatedBanner);
    }

    async deleteBanner(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const deleted = await this.bannerRepository.delete(id);
        return res.status(200).json(deleted);
    }

    async getBanner(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const banner = await this.bannerRepository.findById(id);
        return res.status(200).json(banner);
    }

    async getAllBanners(req: Request, res: Response): Promise<Response> {
        const banners = await this.bannerRepository.getAllBanners();
        return res.status(200).json(banners);
    }

    async changeStatus(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const status = req.body.status;
        const banner = await this.bannerRepository.changeStatus(id, status);
        return res.status(200).json(banner);
    }

    async getActiveBanners(req: Request, res: Response): Promise<Response> {
        const banners = await this.bannerRepository.getActiveBanners();
        return res.status(200).json(banners);
    }

    async getInactiveBanners(req: Request, res: Response): Promise<Response> {
        const banners = await this.bannerRepository.getInactiveBanners();
        return res.status(200).json(banners);
    }
}