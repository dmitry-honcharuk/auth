import { UserDTO } from '../../../core/entities/user';

declare module 'next' {
  export interface NextApiRequest<T = any> {
    user: UserDTO | null;
  }
}
