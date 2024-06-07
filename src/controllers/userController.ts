import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { UserService } from '../services/userService';
import { TYPES } from '../types/types';
import { CustomException } from '../exceptions/customException';

@controller('/users')
export class UserController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService
  ) {}

  @httpPost('/signup')
  public async signup(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const user = await this.userService.signup(username, password);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof CustomException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  @httpPost('/login')
  public async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const token = await this.userService.login(username, password);
      res.json({ token });
    } catch (error) {
      if (error instanceof CustomException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}
