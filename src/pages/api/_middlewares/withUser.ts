import Cookies from 'cookies';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserAuthDTO } from '../../../../core/entities/user';
import { JWT_COOKIE_NAME, JWT_SECRET } from '../../../config/env';
import { Middleware } from './Middleware';

export const withUser: Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next,
) => {
  const cookies = new Cookies(req, res);

  const token = cookies.get(JWT_COOKIE_NAME);

  if (!token) {
    req.user = null;
    next();
    return;
  }

  verify(token, JWT_SECRET, (error, payload) => {
    if (error || !payload) {
      req.user = null;
    }

    req.user = payload as UserAuthDTO;

    next();
  });
};
