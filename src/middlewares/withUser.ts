import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware } from 'next-connect';
import { getCurrentUser } from '../backend/utils/getCurrentUser';

export const withUser: Middleware<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next,
) => {
  try {
    req.user = await getCurrentUser(req, res);
  } catch (e) {
    req.user = null;
  }

  next();
};
