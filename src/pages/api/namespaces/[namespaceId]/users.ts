import { NextApiRequest, NextApiResponse } from 'next';
import { listNamespaceCustomersFactory } from '../../../../../core/use-cases/users/list-namespace-customers';
import { createRoute } from '../../../../backend/utils/createRoute';
import { normalizeQueryParam } from '../../../../backend/utils/normalizeQueryParam';
import { customerRepository } from '../../../../dependencies/repositories';
import { protectedRoute } from '../../../../middlewares/protectedRoute';

export default createRoute().use(protectedRoute).get(getUsers);

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { namespaceId: namespaceIdQuery },
    user,
  } = req;

  if (!user) {
    res.status(400).json({});
    return;
  }

  const namespaceId = normalizeQueryParam(namespaceIdQuery);

  const getUsers = listNamespaceCustomersFactory({
    customerRepository: customerRepository,
  });

  res.status(200).json(await getUsers({ currentUser: user, namespaceId }));
}
