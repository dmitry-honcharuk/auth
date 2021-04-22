import { NextApiRequest, NextApiResponse } from 'next';
import { createRoute } from '../../../app/backend/utils/createRoute';
import { normalizeQueryParam } from '../../../app/backend/utils/normalizeQueryParam';
import { passwordManager } from '../../../app/dependencies/passwordManager';
import {
  customerRepository,
  namespaceRepository,
} from '../../../app/dependencies/repositories';
import { buildRegisterUseCase } from '../../../core/use-cases/customers/register';

export default createRoute().post(registerCustomer);

async function registerCustomer(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { clientId: clientIdQuery },
    body: { email, password },
  } = req;

  const clientId = normalizeQueryParam(clientIdQuery);

  const registerEndUser = buildRegisterUseCase({
    customerRepository: customerRepository,
    passwordManager,
    namespaceRepository,
  });

  const token = await registerEndUser({ email, password, clientId });

  return res.json({ token });
}
