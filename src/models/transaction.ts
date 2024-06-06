import { Schema, model, Document } from 'mongoose';

interface TransactionInterface {
  id: string;
  date: number;
  sender: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    IDNumber: string;
  };
  recipient: {
    firstName: string;
    lastName: string;
    email: string;
    accountNumber: string;
    bank: string;
  };
  amount: number;
  currencyCd: string;
  comments: string;
  status: string;
}

const transactionSchema = new Schema<TransactionInterface>({
  id: { type: String, required: true },
  date: { type: Number, required: true },
  sender: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    IDNumber: { type: String, required: true }
  },
  recipient: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bank: { type: String, required: true }
  },
  amount: { type: Number, required: true },
  currencyCd: { type: String, required: true },
  comments: { type: String, required: true },
  status: { type: String, required: true }
});

const Transaction = model<TransactionInterface>('Transaction', transactionSchema);

export { TransactionInterface , Transaction };
