import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import { JWT_COOKIE_NAME } from '../../config/env';

export function getTokenFromCookies(
  req: IncomingMessage,
  res: ServerResponse,
): string | null {
  const cookies = new Cookies(req, res);

  const token = cookies.get(JWT_COOKIE_NAME);

  return token ?? null;
}
