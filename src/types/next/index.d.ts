import { UserDTO } from '../../../core/entities/end-user';

declare module 'next' {
  export interface NextApiRequest {
    user: UserDTO | null;
  }
}
