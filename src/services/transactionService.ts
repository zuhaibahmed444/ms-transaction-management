import { injectable } from 'inversify';
import { Transaction, TransactionInterface } from '../models/transaction';
import { TransactionNotFoundError } from '../exceptions/TransactionNotFoundException';

@injectable()
export class TransactionService {
  public async getTransactions(startDate: number, endDate: number): Promise<TransactionInterface[]> {
    const transactions = await Transaction.find({
      date: { $gte: startDate, $lte: endDate },
      status: { $in: ['COMPLETED', 'IN PROGRESS', 'REJECTED'] }
    }).sort({ date: -1 }).exec();

    return transactions;
  }

  public async updateTransactionComment(id: string, comment: string): Promise<TransactionInterface> {
    const transaction = await Transaction.findOneAndUpdate(
      { id },
      { comments: comment },
      { new: true }
    ).exec();

    if (!transaction) {
      throw new TransactionNotFoundError();
    }
    return transaction;

  }

  public async getTransactionById(id: string): Promise<TransactionInterface[]> {
    const transaction = await Transaction.find({id}).exec();
    if (!transaction) {
      throw new TransactionNotFoundError();
    }
    return transaction;
  }
}
