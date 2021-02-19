import { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from '../../../core/errors/ValidationError';
import { buildRegisterUseCase } from '../../../core/use-cases/register';
import { passwordManager } from '../../dependencies/passwordManager';
import { userRepository } from '../../dependencies/repositories';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const response = await buildRegisterUseCase({
    userRepository,
    passwordManager,
  })(body);

  if (response instanceof ValidationError) {
    res.status(400).json({ message: response.message });
    return;
  }

  res.status(200).json({ id: response });
}
