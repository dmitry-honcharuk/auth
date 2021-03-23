import { NextApiRequest, NextApiResponse } from 'next';
import { createRoute } from '../../backend/utils/createRoute';
import { userRepository } from '../../dependencies/repositories';

export default createRoute().get(getAllUsers);

async function getAllUsers(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  try {
    const users = await userRepository.getUserByEmail('');

    return res.json(query);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
}
