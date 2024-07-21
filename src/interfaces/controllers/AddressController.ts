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
                user_id: req.user.id
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



    async findAddressById(req : CustomRequest , res : Response){
        try {
            const address = await this.addressRepository.findAddressById(req.params.id , req.user.id);
            res.status(200).json(address);
        } catch (error : any) {
            res.status(400).json({ message: error.message });
        }
    }

    async findAddressByUser(req : CustomRequest , res : Response){
        try {
            const address = await this.addressRepository.findAddressByUserId(req.user.id);
            res.status(200).json(address);
        } catch (error : any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getLimitedAddresses(req : CustomRequest , res : Response){
        try {
            const limit = req.query.limit as string;
            const addresses = await this.addressRepository.getLimitedAddresses(req.user.id , parseInt(limit));
            res.status(200).json(addresses);
        } catch (error : any) {
            res.status(400).json({ message: error.message });
        }
    }


    async getAddressesUsesByPagination(req : CustomRequest , res : Response){
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const totalAddresses = await this.addressRepository.countAddresses(req.user.id);
            const totalPages = Math.ceil(totalAddresses / limit);
            // check if the page is greater than total pages
            if (page > totalPages) {
                // throw new Error("Page not found");
                return res.status(400).json({ message: "Page not found" });
            }

            const address = await this.addressRepository.getAddressesByPagination(req.user.id , page , limit);
            res.status(200).json({ 
                address , 
                currentPage: page,
                totalPages: totalPages,
            });
        } catch (error : any) {
            res.status(400).json({ message: error.message });
        }
    }

}