import { injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserInterface } from '../models/user';
import { UserAlreadyExistsException } from '../exceptions/UserAlreadyExistsException';
import { InvalidCredentialsException } from '../exceptions/InvalidCredentialsException';

@injectable()
export class UserService {
  private jwtSecret = process.env.JWT_SECRET || 'secret'; 

  public async signup(username: string, password: string): Promise<UserInterface> {
    const existingUser = await User.findOne({ username });
    console.log("USEERRRR",existingUser);
    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    return user;
  }

  public async login(username: string, password: string): Promise<string | null> {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new InvalidCredentialsException();
    }

    const token = jwt.sign({ userId: user._id }, this.jwtSecret, { expiresIn: '1h' });
    return token;
  }
}
