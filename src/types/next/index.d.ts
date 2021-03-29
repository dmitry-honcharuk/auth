import { UserAuthDTO } from '../../../core/entities/user';

declare module 'next' {
  export interface NextApiRequest {
    user: UserAuthDTO | null;
  }
}
