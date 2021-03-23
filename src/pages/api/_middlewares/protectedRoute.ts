import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { withUser } from './withUser';

export const protectedRoute = nc<NextApiRequest, NextApiResponse>()
  .use(withUser)
  .use((req, res, next) => {
    const { user } = req;

    if (user) {
      next();
      return;
    }

    res.status(401).end();
  });
