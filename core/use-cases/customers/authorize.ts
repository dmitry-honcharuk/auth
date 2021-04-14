import { pick } from 'ramda';
import { CustomerTokenPayload, getCustomerTokenPayload } from '../../utils/jwt';

export function authorizeCustomerFactory() {
  return async ({
    token,
    clientId,
  }: Input): Promise<null | CustomerTokenPayload> => {
    try {
      const payload = await getCustomerTokenPayload(token, clientId);

      return pick(['id'], payload);
    } catch (error) {
      return null;
    }
  };
}

type Input = {
  token: string;
  clientId: string;
};
