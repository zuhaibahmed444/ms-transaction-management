import mongoose from 'mongoose';
import { Transaction, TransactionInterface } from '../models/transaction';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/transactions';

async function seedDatabase() {
  await mongoose.connect(mongo_uri);

  const transactions: TransactionInterface[] = [
    {
      id: "1",
      date: 1639502071000,
      sender: {
        firstName: "John",
        lastName: "Smith",
        dateOfBirth: "1970-01-23",
        IDNumber: "100001"
      },
      recipient: {
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@company.com",
        accountNumber: "200001",
        bank: "TD"
      },
      amount: 100.00,
      currencyCd: "CAD",
      comments: "Utility bill",
      status: "COMPLETED"
    },
    {
      id: "2",
      date: 1639486575000,
      sender: {
        firstName: "John2",
        lastName: "Smith",
        dateOfBirth: "1970-02-23",
        IDNumber: "100002"
      },
      recipient: {
        firstName: "Jane2",
        lastName: "Doe",
        email: "janedoe@company2.com",
        accountNumber: "200002",
        bank: "TD"
      },
      amount: 150.00,
      currencyCd: "USD",
      comments: "Rent",
      status: "PENDING"
    },
    {
      id: "3",
      date: 1639478930000,
      sender: {
        firstName: "John3",
        lastName: "Smith",
        dateOfBirth: "1970-03-23",
        IDNumber: "100003"
      },
      recipient: {
        firstName: "Jane3",
        lastName: "Doe",
        email: "janedoe@company3.com",
        accountNumber: "200003",
        bank: "CIBC"
      },
      amount: 300.00,
      currencyCd: "USD",
      comments: "Insurance Premium",
      status: "IN PROGRESS"
    },
    {
      id: "4",
      date: 1638997755000,
      sender: {
        firstName: "John4",
        lastName: "Smith",
        dateOfBirth: "1970-04-23",
        IDNumber: "100004"
      },
      recipient: {
        firstName: "Jane4",
        lastName: "Doe",
        email: "janedoe@company4.com",
        accountNumber: "200004",
        bank: "RBC"
      },
      amount: 200.00,
      currencyCd: "CAD",
      comments: "Cash Transfer",
      status: "REJECTED"
    }
  ];

  await Transaction.insertMany(transactions);
  console.log("Dummy data inserted successfully!");
  await mongoose.disconnect();
}

seedDatabase().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
