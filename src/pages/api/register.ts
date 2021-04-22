import Cookies from 'cookies';
import { sign as signJwt } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRoute } from '../../app/backend/utils/createRoute';
import { JWT_COOKIE_NAME, JWT_SECRET } from '../../app/config/env';
import { passwordManager } from '../../app/dependencies/passwordManager';
import { userRepository } from '../../app/dependencies/repositories';
import { userToAuthDTO } from '../../core/entities/user';
import { registerUseCaseFactory } from '../../core/use-cases/users/register';

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
