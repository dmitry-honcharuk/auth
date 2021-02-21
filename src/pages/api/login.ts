import { NextApiRequest, NextApiResponse } from 'next';
import { CoreError } from '../../../core/backend/errors/CoreError';
import { buildLoginUseCase } from '../../../core/backend/use-cases/login';
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

  res.status(200).json({ user: response });
}
