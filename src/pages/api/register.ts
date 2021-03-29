import Cookies from 'cookies';
import { sign as signJwt } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { userToAuthDTO } from '../../../core/entities/user';
import { registerUseCaseFactory } from '../../../core/use-cases/users/register';
import { createRoute } from '../../backend/utils/createRoute';
import { JWT_COOKIE_NAME, JWT_SECRET } from '../../config/env';
import { passwordManager } from '../../dependencies/passwordManager';
import { userRepository } from '../../dependencies/repositories';

export default createRoute().post(registerUser);

async function registerUser(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { email, password },
  } = req;

  const user = await registerUseCaseFactory({
    userRepository,
    passwordManager,
  })({ email, password });

  const cookies = new Cookies(req, res);

  cookies.set(JWT_COOKIE_NAME, signJwt(userToAuthDTO(user), JWT_SECRET));

  res.json({ user: user });
}
