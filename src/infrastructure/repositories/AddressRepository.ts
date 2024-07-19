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

    async findAddressById(addressId: string): Promise<Address | null> {
        const address = await this.addressModel.findById(addressId);
        return address as Address | null;
    }

    async findAddressByUserId(userId: string): Promise<Address | null> {
        const address = await this.addressModel.findOne({ userId    });
        return address as Address | null; 
    }

    async updateAddress(id: string, address: Partial<Address>): Promise<Address> {
        const updatedAddress = await this.addressModel.findByIdAndUpdate(id, address, { new: true });
        return updatedAddress?.toObject() as Address;
    }

    async deleteAddress(addressId: string): Promise<boolean> {
        const deletedAddress = await this.addressModel.findByIdAndDelete(addressId);
        return !!deletedAddress;
    }

}