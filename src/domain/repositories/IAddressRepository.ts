import { Address } from "../entities/Address";



export interface IAddressRepository {
    createAddress(address: Partial<Address>): Promise<Address>;
    findAddressById(addressId: string): Promise<Address | null>;
    findAddressByUserId(userId: string): Promise<Address | null>;
    updateAddress(id : string, address: Partial<Address>): Promise<Address>;
    deleteAddress(addressId: string): Promise<boolean>;
}