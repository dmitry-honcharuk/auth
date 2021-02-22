import { NextApiRequest, NextApiResponse } from 'next';
import { createAddNamespaceUseCase } from '../../../core/use-cases/add-namespace';
import { createListNamespacesUseCase } from '../../../core/use-cases/list-namespaces';
import { isCoreError } from '../../../core/utils';
import { namespaceRepository } from '../../dependencies/repositories';
import { protectedRoute } from './_middlewares/protectedRoute';

async function Namespaces(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body: { name },
    user,
  } = req;

  if (method === 'GET') {
    const getAllNamespaces = createListNamespacesUseCase({
      namespaceRepository,
    });

    res.status(200).json(await getAllNamespaces({ currentUser: user }));
    return;
  }

  if (method === 'POST') {
    const addNamespace = createAddNamespaceUseCase({
      namespaceRepository,
    });

    const result = await addNamespace({
      name,
      currentUser: user,
    });

    if (isCoreError(result)) {
      res.status(400).json({ message: result.message });
    }

    res.json(result);
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
  return;
}

export default protectedRoute(Namespaces);
