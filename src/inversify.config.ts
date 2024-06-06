import { Container } from 'inversify';
import { TYPES } from './types';
import { TransactionService } from './services/transactionService';

const container = new Container();

container.bind<TransactionService>(TYPES.TransactionService).to(TransactionService);

export { container };
