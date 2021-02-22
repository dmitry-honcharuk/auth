import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT_COOKIE_NAME } from '../../config/env';

export default async function CurrentUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const cookies = new Cookies(req, res);

  cookies.set(JWT_COOKIE_NAME);

  res.status(200).json({});
}
