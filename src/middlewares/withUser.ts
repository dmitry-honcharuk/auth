import Cookies from 'cookies';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware } from 'next-connect';
import { CustomerAuthDTO } from '../../core/entities/customer';
import { JWT_COOKIE_NAME, JWT_SECRET } from '../config/env';

export const withUser: Middleware<NextApiRequest, NextApiResponse> = (
  req,
  res,
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

    req.user = payload as CustomerAuthDTO;

    next();
  });
};
