import { Model } from "mongoose";
import { IBannerRepository } from "../../domain/repositories/IBannerRepository";
import { BannerModel, IBannerDocument } from "../models/BannerModel";
import { Banner } from "../../domain/entities/Banner";


export class BannerRepository implements IBannerRepository {

    private bannerModel: Model<IBannerDocument>;

    constructor() {
        this.bannerModel = BannerModel;
    }


    async getAllBanners(): Promise<Banner[]> {
        throw new Error("Method not implemented.");
    }


    async create(banner: Banner): Promise<Banner> {
        const newBanner = new this.bannerModel(banner);
        await newBanner.save();
        return newBanner.toObject() as Banner;
    }

    async update(banner: Banner): Promise<Banner> {
        const updatedBanner = await this.bannerModel.findByIdAndUpdate(banner._id, banner, { new: true });
        return updatedBanner?.toObject() as Banner;
    }

    async delete(id: string): Promise<boolean> {
        const deletedBanner = await this.bannerModel.findByIdAndDelete(id);
        return !!deletedBanner;
    }

    async findById(id: string): Promise<Banner | null> {
        const banner = await this.bannerModel.findById(id);
        return banner as Banner | null;
    }


    async changeStatus(id: string, status: number): Promise<Banner | null> {
        const updatedBanner = await this.bannerModel.findByIdAndUpdate(id, { status }, { new: true });
        // return updatedBanner?.toObject() as Banner;
        if (updatedBanner) {
            return {
                ...updatedBanner.toObject(),
                _id: updatedBanner._id.toString()
            } as Banner;
        }
        return null ;
    }

    async getActiveBanners(): Promise<Banner[]> {
        const banners = await this.bannerModel.find({ status: 1 , expiresAt: { $gte: new Date() } }).lean().exec();
        // return banners as Banner[];
        return banners.map((banner: any) => {
            return {
                ...banner,
                _id: banner._id.toString()
            }
        }) as Banner[];
    }

    async getInactiveBanners(): Promise<Banner[]> {
        // const banners = await this.bannerModel.find({ status: { $in: [0, 2] } }).lean().exec();
        const banners = await this.bannerModel.find({ status: 0 }).lean().exec();
        // return banners as Banner
        return banners.map((banner: any) => {
            return {
                ...banner,
                _id: banner._id.toString()
            }
        }) as Banner[];
    }

    async getExpiredBanners(): Promise<Banner[]> {
        const banners = await this.bannerModel.find({ status: 2 }).lean().exec();
        // return banners as Banner
        return banners.map((banner: any) => {
            return {
                ...banner,
                _id: banner._id.toString()
            }
        }) as Banner[];
    }

}