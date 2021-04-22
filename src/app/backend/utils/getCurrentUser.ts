import { IncomingMessage, ServerResponse } from 'http';
import { verify } from 'jsonwebtoken';
import { UserAuthDTO } from '../../../core/entities/user';
import { JWT_SECRET } from '../../config/env';
import { NoTokenError } from '../../errors/NoTokenError';
import { NoTokenPayloadError } from '../../errors/NoTokenPayloadError';
import { TokenVerificationError } from '../../errors/TokenVerificationError';
import { getTokenFromCookies } from './getTokenFromCookies';

export function getCurrentUser(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<UserAuthDTO> {
  const token = getTokenFromCookies(req, res);

  if (!token) {
    throw new NoTokenError();
  }

  return new Promise((resolve, reject) => {
    verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        reject(new TokenVerificationError(error.message));
        return;
      }

      if (!payload) {
        reject(new NoTokenPayloadError());
        return;
      }

      resolve(payload as UserAuthDTO);
    });
  });
}
