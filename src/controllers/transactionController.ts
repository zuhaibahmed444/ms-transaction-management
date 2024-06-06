import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPut, requestParam } from 'inversify-express-utils';
import { TransactionService } from '../services/transactionService';
import { TYPES } from '../types';

@controller('/transactions')
export class TransactionController {
  constructor(
    @inject(TYPES.TransactionService) private transactionService: TransactionService
  ) {}

  @httpGet('/')
  public async getTransactions(req: Request, res: Response): Promise<void> {
    const { startDate, endDate } = req.query;
    const parsedStartDate = Number(startDate);
    const parsedEndDate = Number(endDate);
    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
        res.status(400).send('Invalid startDate or endDate');
        return;
    }
    const transactions = await this.transactionService.getTransactions(Number(startDate), Number(endDate));
    res.json(transactions);
  }

  @httpPut('/:id/comment')
  public async updateTransactionComment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { comment } = req.body;
    const updatedTransaction = await this.transactionService.updateTransactionComment(id, comment);
    res.json(updatedTransaction);
  }
}
