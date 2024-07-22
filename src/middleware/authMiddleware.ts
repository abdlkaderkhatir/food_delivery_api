import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {config} from '../../src/config';
import { CustomRequest } from '../domain/entities/custumeRequest';
import { AuthUtils } from '../utils/auth_utils';

// dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// const verifyToken = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      // const decoded = jwt.verify(token, config.jwtSecret as string);
      const decoded = AuthUtils.verifyAccessToken(token);
      console.log("decoded",decoded);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Token is not valid.' });
    }
  };


export default verifyToken;