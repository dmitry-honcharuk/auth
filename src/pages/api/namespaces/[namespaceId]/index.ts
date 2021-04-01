import { removeNamespaceFactory } from '../../../../../core/use-cases/users/remove-namespace';
import { createRoute } from '../../../../backend/utils/createRoute';
import { normalizeQueryParam } from '../../../../backend/utils/normalizeQueryParam';
import {
  customerRepository,
  namespaceRepository,
} from '../../../../dependencies/repositories';
import { protectedRoute } from '../../../../middlewares/protectedRoute';

export default createRoute()
  .use(protectedRoute)
  .delete(async (req, res) => {
    const {
      query: { namespaceId: namespaceIdQuery },
      user,
    } = req;

    const namespaceId = normalizeQueryParam(namespaceIdQuery);

    await removeNamespaceFactory({
      customerRepository,
      namespaceRepository,
    })({ namespaceId, currentUserId: user!.id });

    res.json({});
  });
