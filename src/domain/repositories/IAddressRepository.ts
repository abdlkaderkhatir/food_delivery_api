import { Address } from "../entities/Address";



export interface IAddressRepository {
    createAddress(address: Partial<Address>): Promise<Address>;
    findAddressById(addressId: string , userId: string): Promise<Address | null>;
    findAddressByUserId(userId: string): Promise<Address | null>;
    updateAddress(addressId : string, userId: string , address: Partial<Address>): Promise<Address>;
    deleteAddress(addressId: string , userId : string): Promise<boolean>;
    getLimitedAddresses(userId: string , limit: number): Promise<Address[]>;
}