import { UserEntity } from '../entities/user';

export interface UserRepository {
  isEmailTakenInNamespace(clientId: string, email: string): Promise<boolean>;
  saveUser(options: SaveUserInput): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<null | UserEntity>;
  getUserInNamespaceByEmail(
    namespace: string,
    email: string,
  ): Promise<null | UserEntity>;
}

export type SaveUserInput = {
  email: string;
  password: string;
  namespace: string;
};
