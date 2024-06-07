import { CustomException } from './customException';

export class UserAlreadyExistsException extends CustomException {
  constructor() {
    super('Username already taken', 400);
  }
}
