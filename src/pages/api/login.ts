import Cookies from 'cookies';
import { sign as signJwt } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { userToAuthDTO } from '../../../core/entities/user';
import { CoreError } from '../../../core/errors/CoreError';
import { buildLoginUseCase } from '../../../core/use-cases/app/login';
import { createRoute } from '../../backend/utils/createRoute';
import { JWT_COOKIE_NAME, JWT_SECRET } from '../../config/env';
import { passwordManager } from '../../dependencies/passwordManager';
import { userRepository } from '../../dependencies/repositories';

export default createRoute().post(loginUser);

async function loginUser(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { email, password },
  } = req;

  const response = await buildLoginUseCase({
    userRepository,
    passwordManager,
  })({ email, password });

  if (response instanceof CoreError) {
    res.status(400).json({ message: response.message });
    return;
  }

  const cookies = new Cookies(req, res);

  cookies.set(JWT_COOKIE_NAME, signJwt(userToAuthDTO(response), JWT_SECRET));

  res.status(200).json({ user: response });
}
