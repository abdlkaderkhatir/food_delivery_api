import { NextFunction, Response } from "express";
import { CustomRequest } from "../domain/entities/custumeRequest";


const adminRole = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. You are not an admin.' });
    }
    next();
};

export default adminRole;