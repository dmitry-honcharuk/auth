import { CustomerTokenPayload, getCustomerTokenPayload } from '../../utils/jwt';

export function authorizeCustomerFactory() {
  return async ({ token, clientId }: Input): Promise<null | CustomerTokenPayload> => {
    try {
      return await getCustomerTokenPayload(token, clientId);
    } catch (error) {
      return null;
    }
  };
}

type Input = {
  token: string;
  clientId: string;
};
