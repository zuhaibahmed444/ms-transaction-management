import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { CustomException } from '../exceptions/customException';

const jwtSecret = 'secret'; 

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new CustomException('Unauthorized', 401);
    }

    (req as any).user = user;
    next();
  } catch (error) {
    if (error instanceof CustomException) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
};
