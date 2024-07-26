import { Model } from "mongoose";
import { IAddressRepository } from "../../domain/repositories/IAddressRepository";
import { AddressModel, IAdressDocument } from "../models/AddressModel";
import { Address } from "../../domain/entities/Address";



export class AddressRepository implements IAddressRepository {

    private addressModel : Model<IAdressDocument>

    constructor(){
        this.addressModel = AddressModel;
    }


    async createAddress(address: Partial<Address>): Promise<Address> {
        const newAddress = new this.addressModel(address);
        await newAddress.save();
        return newAddress.toObject();

    }

    async findAddressById(addressId: string , userId: string): Promise<Address | null> {
        const address = await this.addressModel.findOne({ _id: addressId, user_id: userId });
        return address as Address | null;
    }

    async findAddressByUserId(userId: string): Promise<Address | null> {
        const address = await this.addressModel.findOne({ user_id: userId });
        return address as Address | null; 
    }

    async countAddresses(userId: string): Promise<number> {
        const count = await this.addressModel.countDocuments({ user_id: userId });
        return count;
    }

    async updateAddress(addressId: string, userId: string ,  address: Partial<Address>): Promise<Address> {
        // const updatedAddress = await this.addressModel.findByIdAndUpdate(addressId, address, { new: true });
        const updatedAddress = await this.addressModel.findOneAndUpdate(
            { _id: addressId , user_id: userId },
            address,
            { new: true }
        );
        return updatedAddress?.toObject() as Address;
    }

    async deleteAddress(addressId: string , userId : string): Promise<boolean> {
        const deletedAddress = await this.addressModel.findOneAndDelete({ _id: addressId, user_id: userId });
        return !!deletedAddress;
    }


    async getLimitedAddresses(userId: string , limit: number): Promise<Address[]> {
        const addresses = await this.addressModel.find({ user_id: userId }).limit(limit);
        if (!addresses) {
            return [];
        }
        return addresses.map(address => address.toObject());
    }


    async getAddressesByPagination(userId: string , page: number , limit: number): Promise<Address[]> {
        const addresses = await this.addressModel.find({ user_id: userId }).skip((page - 1) * limit).limit(limit);
        if (!addresses) {
            return [];
        }
        return addresses.map(address => address.toObject());
    }

}