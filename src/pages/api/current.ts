import Cookies from 'cookies';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT_COOKIE_NAME, JWT_SECRET } from '../../app/config/env';

export default async function CurrentUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const cookies = new Cookies(req, res);

  const token = cookies.get(JWT_COOKIE_NAME);

  if (!token) {
    res.status(200).json({ user: null });
    return;
  }

  verify(token, JWT_SECRET, (error, payload) => {
    if (error || !payload) {
      res.status(401).end();
      return;
    }

    res.status(200).json({ user: payload });
  });
}
