import { NextApiRequest, NextApiResponse } from 'next';
import { buildRegisterUseCase } from '../../../../core/use-cases/customers/register';
import { createRoute } from '../../../backend/utils/createRoute';
import { normalizeQueryParam } from '../../../backend/utils/normalizeQueryParam';
import { passwordManager } from '../../../dependencies/passwordManager';
import {
  customerRepository,
  namespaceRepository,
} from '../../../dependencies/repositories';

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
