import { PublicUser } from '../../entities/user';

export interface AuthApi {
  register(options: { email: string; password: string }): Promise<PublicUser>;
}
