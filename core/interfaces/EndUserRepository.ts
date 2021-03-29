import { EndUserEntity } from '../entities/end-user';

export interface EndUserRepository {
  isEmailTakenInNamespace(clientId: string, email: string): Promise<boolean>;
  saveUser(options: SaveUserInput): Promise<EndUserEntity>;
  getUserByEmail(email: string): Promise<null | EndUserEntity>;
  getUserInNamespaceByEmail(
    namespace: string,
    email: string,
  ): Promise<null | EndUserEntity>;
  getUsersInNamespace(namespaceId: string): Promise<EndUserEntity[]>;
}

export type SaveUserInput = {
  email: string;
  password: string;
  namespace: string;
};
