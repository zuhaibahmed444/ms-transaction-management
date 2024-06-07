import { Container } from 'inversify';
import { TYPES } from './types/types';
import { TransactionService } from './services/transactionService';
import { UserService } from './services/userService';

const container = new Container();

container.bind<TransactionService>(TYPES.TransactionService).to(TransactionService);
container.bind<UserService>(TYPES.UserService).to(UserService);

export { container };
