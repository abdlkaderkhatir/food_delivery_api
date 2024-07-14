import { Model } from "mongoose";
import { IRestaurentRepository } from "../../domain/repositories/IRestaurentRepository";
import { IRestaurentDocument, RestaurentModel } from "../models/RestaurentModel";
import { Restaurent } from "../../domain/entities/Restaurent";


export class RestaurentRepository implements IRestaurentRepository {
    private restaurentModel: Model<IRestaurentDocument>;

    constructor() {
        this.restaurentModel = RestaurentModel;
    }


    getAllRestaurents(): Promise<Restaurent[]> {
        try {
            return this.restaurentModel.find();
        } catch (error) {
            throw error;
        } 
    }
    
    async create(restaurent: Partial<Restaurent>): Promise<Restaurent> {
        try {
            const restaurentObj = new this.restaurentModel(restaurent);
            await restaurentObj.save();
            return restaurentObj.toObject() as Restaurent;
        } catch (error) {
            throw error;
        }
    }
    
    fetchOne(id: string): Promise<Restaurent | null> {
        try {
            return this.restaurentModel.findById(id);
        } catch (error) {
            throw error;
        }
    }
    // async update(restaurent: Partial<Restaurent>): Promise<Restaurent | null> {
    //     try {
    //         // return await this._restaurentModel.findByIdAndUpdate(restaurent._id, restaurent, { new: true });
    //         const updatedRestaurent = await this.restaurentModel.findByIdAndUpdate(restaurent._id, restaurent, { new: true });
    //         return updatedRestaurent ? updatedRestaurent.toObject() as Restaurent : null;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async delete(id: string): Promise<boolean> {
    //     try {
    //         const result = await this.restaurentModel.findByIdAndDelete(id);
    //         return result ? true : false;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    // async findById(id: string): Promise<Restaurent | null> {
    //     try {
    //         return await this.restaurentModel.findById(id);
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    // async getAllRestaurents(): Promise<Restaurent[]> {
    //     try {
    //         return await this.restaurentModel.find();
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    // async changeStatus(id: string, status: string): Promise<Restaurent | null> {
    //     try {
    //         return await this.restaurentModel.findByIdAndUpdate(id, { status }, { new: true });
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    // async getActiveRestaurents(): Promise<Restaurent[]> {
    //     try {
    //         return await this.restaurentModel.find({ status: 'active' });
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}
 
