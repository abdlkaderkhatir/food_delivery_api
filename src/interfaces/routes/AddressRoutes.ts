import { Router } from "express";
import { AddressRepository } from "../../infrastructure/repositories/AddressRepository";
import { AddressController } from "../controllers/AddressController";
import verifyToken from "../../middleware/authMiddleware";



const router = Router();

const addressRepository = new AddressRepository();

const addressController = new AddressController(addressRepository);



router.post('/add', verifyToken , addressController.addAddress.bind(addressController));

router.get('/find/:id', verifyToken , addressController.findAddressById.bind(addressController));

router.get('/' , addressController.getAddresses.bind(addressController));

// get address by user id
 
router.get('/user/', verifyToken , addressController.findAddressByUser.bind(addressController));

router.get('/user/pagination', verifyToken , addressController.getAddressesUsesByPagination.bind(addressController));

// check address pass lon and lat with query params


// limit 

router.get('/limited-addresses', verifyToken , addressController.getLimitedAddresses.bind(addressController));


export default router;