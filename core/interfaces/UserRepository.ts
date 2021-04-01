import { UserEntity } from '../entities/user';

export interface UserRepository {
  isEmailTaken(email: string): Promise<boolean>;

  saveUser(options: SaveUserInput): Promise<UserEntity>;

  getUserByEmail(email: string): Promise<null | UserEntity>;
}

export type SaveUserInput = {
  email: string;
  password: string;
};
