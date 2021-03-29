import { NextApiRequest, NextApiResponse } from 'next';
import { listNamespaceUsersFactory } from '../../../../../core/use-cases/app/list-namespace-users';
import { createRoute } from '../../../../backend/utils/createRoute';
import { normalizeQueryParam } from '../../../../backend/utils/normalizeQueryParam';
import { userRepository } from '../../../../dependencies/repositories';
import { protectedRoute } from '../../../../middlewares/protectedRoute';

export default createRoute().use(protectedRoute).get(getUsers);

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { namespaceId: namespaceIdQuery },
    user,
  } = req;

  const namespaceId = normalizeQueryParam(namespaceIdQuery);

  const getUsers = listNamespaceUsersFactory({
    userRepository,
  });

  res.status(200).json(await getUsers({ currentUser: user, namespaceId }));
}
