import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    // const token = req.header('Authorization')?.replace('Bearer ', '');
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Token is not valid.' });
    }
  };
  
  export default verifyToken;