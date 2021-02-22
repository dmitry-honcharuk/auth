import { NextApiRequest, NextApiResponse } from 'next';

export type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void,
) => void | Promise<void>;
