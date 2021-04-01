import { NextApiRequest, NextApiResponse } from 'next';
import { authorizeCustomerFactory } from '../../../../core/use-cases/customers/authorize';
import { createRoute } from '../../../backend/utils/createRoute';
import { normalizeQueryParam } from '../../../backend/utils/normalizeQueryParam';

export default createRoute().get(authorizeCustomer);

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

  const authorized = await authorizeCustomerFactory()({
    clientId,
    token,
  });

  return res.status(authorized ? 200 : 401).json({});
}
