import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware } from './Middleware';

export const use = (...middlewares: Middleware[]) => (
  handler: Middleware,
) => async (req: NextApiRequest, res: NextApiResponse) => {
  const getNext = (index: number = 0) => {
    if (index === middlewares.length - 1) {
      return async () => {
        await handler(req, res, () => {});
      };
    }

    return async () => {
      await middlewares[index + 1](req, res, getNext(index + 1));
    };
  };

  const [first] = middlewares;

  await first(req, res, getNext());
};
