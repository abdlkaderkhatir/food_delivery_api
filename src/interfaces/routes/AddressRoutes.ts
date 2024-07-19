import { Router } from "express";
import { AddressRepository } from "../../infrastructure/repositories/AddressRepository";
import { AddressController } from "../controllers/AddressController";



const router = Router();

const addressRepository = new AddressRepository();

const addressController = new AddressController(addressRepository);



router.post('/add', addressController.addAddress.bind(addressController));

// router.get('/find/:id', addressController.findAddressById);


// get addresses

router.get('/' , addressController.getAddresses.bind(addressController));



export default router;