import { CustomException } from './customException';

export class InvalidCredentialsException extends CustomException {
  constructor() {
    super('Invalid username or password', 401);
  }
}
