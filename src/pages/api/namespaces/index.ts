import { createRoute } from '../../../app/backend/utils/createRoute';
import { namespaceRepository } from '../../../app/dependencies/repositories';
import { protectedRoute } from '../../../app/middlewares/protectedRoute';
import { createAddNamespaceUseCase } from '../../../core/use-cases/users/add-namespace';
import { createListNamespacesUseCase } from '../../../core/use-cases/users/list-namespaces';
import { isCoreError } from '../../../core/utils';

export default createRoute()
  .use(protectedRoute)
  .get(async (req, res) => {
    const { user } = req;

    const getAllNamespaces = createListNamespacesUseCase({
      namespaceRepository,
    });

    res.status(200).json(
      await getAllNamespaces({
        currentUserId: user!.id,
      }),
    );
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
      currentUserId: user!.id,
    });

    if (isCoreError(result)) {
      res.status(400).json({ message: result.message });
      return;
    }

    res.json(result);
  });
