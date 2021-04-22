import { createRoute } from '../../../../app/backend/utils/createRoute';
import { normalizeQueryParam } from '../../../../app/backend/utils/normalizeQueryParam';
import {
  customerRepository,
  namespaceRepository,
} from '../../../../app/dependencies/repositories';
import { protectedRoute } from '../../../../app/middlewares/protectedRoute';
import { removeNamespaceFactory } from '../../../../core/use-cases/users/remove-namespace';

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
