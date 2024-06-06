import { injectable } from 'inversify';
import { Transaction, TransactionInterface } from '../models/transaction';

@injectable()
export class TransactionService {
  public async getTransactions(startDate: number, endDate: number): Promise<any> {
    console.log(startDate,endDate);
    const transactions = await Transaction.find({
      date: { $gte: startDate, $lte: endDate },
      status: { $in: ['COMPLETED', 'IN PROGRESS', 'REJECTED'] }
    }).sort({ date: 1 }).exec();

    return transactions;
  }

  public async updateTransactionComment(id: string, comment: string): Promise<TransactionInterface | null> {
    const transaction = await Transaction.findOneAndUpdate(
      { id },
      { comments: comment },
      { new: true }
    ).exec();

    return transaction;
  }
}
