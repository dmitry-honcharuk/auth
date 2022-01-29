import { NextApiRequest, NextApiResponse } from 'next';
import { createRoute } from '../../../app/backend/utils/createRoute';

export default createRoute().post(requestPasswordReset);

async function requestPasswordReset(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { email },
  } = req;

  res.json({ email });
}
