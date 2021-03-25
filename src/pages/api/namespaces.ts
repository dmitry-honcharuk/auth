import { createAddNamespaceUseCase } from '../../../core/use-cases/app/add-namespace';
import { createListNamespacesUseCase } from '../../../core/use-cases/app/list-namespaces';
import { isCoreError } from '../../../core/utils';
import { createRoute } from '../../backend/utils/createRoute';
import { namespaceRepository } from '../../dependencies/repositories';
import { protectedRoute } from '../../middlewares/protectedRoute';

export default createRoute()
  .use(protectedRoute)
  .get(async (req, res) => {
    const { user } = req;

    const getAllNamespaces = createListNamespacesUseCase({
      namespaceRepository,
    });

    res.status(200).json(await getAllNamespaces({ currentUser: user }));
  })
  .post(async (req, res) => {
    const {
      body: { name },
      user,
    } = req;

    const addNamespace = createAddNamespaceUseCase({
      namespaceRepository,
    });

    const result = await addNamespace({
      name,
      currentUser: user,
    });

    if (isCoreError(result)) {
      res.status(400).json({ message: result.message });
      return;
    }

    res.json(result);
  });
