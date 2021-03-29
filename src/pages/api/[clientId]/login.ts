import { NextApiRequest, NextApiResponse } from 'next';
import { buildLoginUseCase } from '../../../../core/use-cases/customers/login';
import { createRoute } from '../../../backend/utils/createRoute';
import { normalizeQueryParam } from '../../../backend/utils/normalizeQueryParam';
import { passwordManager } from '../../../dependencies/passwordManager';
import {
  customerRepository,
  namespaceRepository,
} from '../../../dependencies/repositories';

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
