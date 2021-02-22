import { use } from './use';
import { withUser } from './withUser';

export const protectedRoute = use(withUser, (req, res, next) => {
  const { user } = req;

  if (user) {
    next();
    return;
  }

  res.status(401).end();
});
