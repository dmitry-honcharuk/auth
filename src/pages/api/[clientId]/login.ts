import { NextApiRequest, NextApiResponse } from 'next';
import { buildLoginUseCase } from '../../../../core/use-cases/end-users/login';
import { createRoute } from '../../../backend/utils/createRoute';
import { normalizeQueryParam } from '../../../backend/utils/normalizeQueryParam';
import { passwordManager } from '../../../dependencies/passwordManager';
import { userRepository } from '../../../dependencies/repositories';

export default createRoute().post(loginUser);

async function loginUser(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { clientId: clientIdQuery },
    body: { email, password },
  } = req;

  const clientId = normalizeQueryParam(clientIdQuery);

  const loginEndUser = buildLoginUseCase({
    userRepository,
    passwordManager,
  });

  const token = await loginEndUser({ email, password, clientId });

  return res.json({ token });
}
