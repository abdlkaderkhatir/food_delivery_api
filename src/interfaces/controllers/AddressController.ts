import { Request, Response } from "express";
import { IAddressRepository } from "../../domain/repositories/IAddressRepository";
import { CustomRequest } from "../../domain/entities/custumeRequest";
import { Address } from "../../domain/entities/Address";



export class AddressController {

    private addressRepository: IAddressRepository;

    constructor(addressRepository: IAddressRepository) {
        this.addressRepository = addressRepository;
    }


    async addAddress(req : CustomRequest , res : Response){
        try {
            const addressData = {
                ...req.body,
                userId: req.user.id
            }

            const address = await this.addressRepository.createAddress(addressData as Address);
            res.status(201).json(address);
        } catch (error : any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAddresses(req : Request , res : Response){
        try {
            const addresses = await this.addressRepository.findAddressByUserId(req.body.userId);
            res.status(200).json(addresses);
        } catch (error : any) {
            res.status(400).json({ message: error.message });
        }
    }

}