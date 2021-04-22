import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRoute } from '../../../app/backend/utils/createRoute';
import { normalizeQueryParam } from '../../../app/backend/utils/normalizeQueryParam';
import { authorizeCustomerFactory } from '../../../core/use-cases/customers/authorize';

export default createRoute().use(cors()).get(authorizeCustomer);

async function authorizeCustomer(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { clientId: clientIdQuery },
  } = req;

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    res.status(401).json({});
    return;
  }

  const clientId = normalizeQueryParam(clientIdQuery);
  const token = req.headers.authorization.replace('Bearer ', '');

  const payload = await authorizeCustomerFactory()({
    clientId,
    token,
  });

  return res.status(payload ? 200 : 401).json(payload ? payload : {});
}
