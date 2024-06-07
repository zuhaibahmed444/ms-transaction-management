import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPut, requestParam } from 'inversify-express-utils';
import { TransactionService } from '../services/transactionService';
import { TYPES } from '../types/types';
import { authMiddleware } from '../middleware/auth'
import { CustomException } from '../exceptions/customException';

@controller('/transactions',authMiddleware)
export class TransactionController {
  constructor(
    @inject(TYPES.TransactionService) private transactionService: TransactionService
  ) {}

  @httpGet('/')
  public async getTransactions(req: Request, res: Response): Promise<void> {
    const { startDate, endDate } = req.query;
    const parsedStartDate = Number(startDate);
    const parsedEndDate = Number(endDate);
    try{
      if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
        throw new CustomException('Invalid start and end date',400);
    }
      const transactions = await this.transactionService.getTransactions(Number(startDate), Number(endDate));
      res.json(transactions);
    }catch (error) {
      if (error instanceof CustomException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    
  }

  @httpPut('/:id/comment')
  public async updateTransactionComment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { comment } = req.body;
    try {
      const transaction = await this.transactionService.updateTransactionComment(id,comment);
      res.json(transaction);
    } catch (error) {
      if (error instanceof CustomException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
  }

  @httpGet('/:id')
  public async getTransactionById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const transaction = await this.transactionService.getTransactionById(id);
      res.json(transaction);
    } catch (error) {
      if (error instanceof CustomException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}
