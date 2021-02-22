import { NextApiRequest, NextApiResponse } from 'next';
import { createAddNamespaceUseCase } from '../../../core/use-cases/add-namespace';
import { createListNamespacesUseCase } from '../../../core/use-cases/list-namespaces';
import { isCoreError } from '../../../core/utils';
import { namespaceRepository } from '../../dependencies/repositories';

export default async function CurrentUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;

  if (method === 'GET') {
    const getAllNamespaces = createListNamespacesUseCase({
      namespaceRepository,
    });

    res.status(200).json(await getAllNamespaces());
    return;
  }

  if (method === 'POST') {
    const addNamespace = createAddNamespaceUseCase({
      namespaceRepository,
    });

    const result = await addNamespace(body);

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
