import { NextApiRequest, NextApiResponse } from 'next';
import { createRoute } from '../../../app/backend/utils/createRoute';
import { normalizeQueryParam } from '../../../app/backend/utils/normalizeQueryParam';
import { passwordManager } from '../../../app/dependencies/passwordManager';
import {
  customerRepository,
  namespaceRepository,
} from '../../../app/dependencies/repositories';
import { buildLoginUseCase } from '../../../core/use-cases/customers/login';

export default createRoute().post(loginCustomer);

async function loginCustomer(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { clientId: clientIdQuery },
    body: { email, password },
  } = req;

  const clientId = normalizeQueryParam(clientIdQuery);

  const loginEndUser = buildLoginUseCase({
    userRepository: customerRepository,
    passwordManager,
    namespaceRepository,
  });

  const token = await loginEndUser({ email, password, clientId });

  return res.json({ token });
}
