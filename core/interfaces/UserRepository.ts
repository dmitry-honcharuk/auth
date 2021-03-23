import { User } from '../entities/user';

export interface UserRepository {
  isEmailTaken(email: string): Promise<boolean>;
  saveUser(options: SaveUserOptions): Promise<User>;
  getUserByEmail(email: string): Promise<null | User>;
}

type SaveUserOptions = {
  email: string;
  password: string;
  namespace: string;
};
