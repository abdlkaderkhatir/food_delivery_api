import { Model } from "mongoose";
import { ICityRepository } from "../../domain/repositories/ICityRepository";
import { CityModel, ICityDocument } from "../models/CityModel";
import { City } from "../../domain/entities/City";


export class CityRepository implements ICityRepository {

    private cityModel: Model<ICityDocument>;

    constructor() {
        this.cityModel = CityModel;
    }

    async create(city: Partial<City>): Promise<City> {
        try {
            const cityObj = new this.cityModel(city);
            await cityObj.save();
            return cityObj.toObject() as City;
        } catch (error) {
            throw error;
        }
    }

    async update(city: Partial<City>): Promise<City | null> {
        try {
            // return await this._cityModel.findByIdAndUpdate(city._id, city, { new: true });
            const updatedCity = await this.cityModel.findByIdAndUpdate(city._id, city, { new: true });
            return updatedCity ? updatedCity.toObject() as City : null;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const result = await this.cityModel.findByIdAndDelete(id);
            return result ? true : false;
        } catch (error) {
            throw error;
        }
    }
    async findById(id: string): Promise<City | null> {
        try {
            return await this.cityModel.findById(id);
        } catch (error) {
            throw error;
        }
    }
    async getAllCities(): Promise<City[]> {
        try {
            return await this.cityModel.find();
        } catch (error) {
            throw error;
        }
    }
    async changeStatus(id: string, status: string): Promise<City | null> {
        try {
            return await this.cityModel.findByIdAndUpdate(id, { status }, { new: true });
        } catch (error) {
            throw error;
        }
    }
    async getActiveCities(): Promise<City[]> {
        try {
            return await this.cityModel.find({ status: 'active' });
        } catch (error) {
            throw error;
        }
    }
    async getInactiveCities(): Promise<City[]> {
        try {
            return await this.cityModel.find({ status: 'inactive' });
        } catch (error) {
            throw error;
        }
    }
}