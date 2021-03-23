import Cookies from 'cookies';
import { sign as signJwt } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { userToAuthDTO } from '../../../core/entities/user';
import { CoreError } from '../../../core/errors/CoreError';
import { buildLoginUseCase } from '../../../core/use-cases/login';
import { JWT_COOKIE_NAME, JWT_SECRET } from '../../config/env';
import { passwordManager } from '../../dependencies/passwordManager';
import { userRepository } from '../../dependencies/repositories';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const response = await buildLoginUseCase({
    userRepository,
    passwordManager,
  })(body);

  if (response instanceof CoreError) {
    res.status(400).json({ message: response.message });
    return;
  }

  const cookies = new Cookies(req, res);

  cookies.set(JWT_COOKIE_NAME, signJwt(userToAuthDTO(response), JWT_SECRET));

  res.status(200).json({ user: response });
}
