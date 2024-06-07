import { CustomException } from "./customException";

export class TransactionNotFoundError extends CustomException {
    constructor() {
      super('Transaction not found', 404);
    }
  }