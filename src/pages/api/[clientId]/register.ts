import { NextApiRequest, NextApiResponse } from 'next';
import { buildRegisterUseCase } from '../../../../core/use-cases/end-users/register';
import { createRoute } from '../../../backend/utils/createRoute';
import { normalizeQueryParam } from '../../../backend/utils/normalizeQueryParam';
import { passwordManager } from '../../../dependencies/passwordManager';
import {
  namespaceRepository,
  userRepository,
} from '../../../dependencies/repositories';

export default createRoute().post(registerUser);

async function registerUser(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { clientId: clientIdQuery },
    body: { email, password },
  } = req;

  const clientId = normalizeQueryParam(clientIdQuery);

  const registerEndUser = buildRegisterUseCase({
    userRepository,
    passwordManager,
    namespaceRepository,
  });

  const token = await registerEndUser({ email, password, clientId });

  return res.json({ token });
}
