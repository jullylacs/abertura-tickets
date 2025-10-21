import { IUser } from '@/models/User';
import User from '@/models/User';
import { hash, compare } from 'bcrypt';

export class UserService {
  static async createUser(userData: Partial<IUser>): Promise<IUser> {
    if (!userData.password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await hash(userData.password, 12);
    const user = new User({
      ...userData,
      password: hashedPassword,
    });

    return await user.save();
  }

  static async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  static async validatePassword(user: IUser, password: string): Promise<boolean> {
    return await compare(password, user.password);
  }

  static async findUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  static async getTechnicians(): Promise<IUser[]> {
    return await User.find({ role: 'TECHNICIAN' });
  }
}