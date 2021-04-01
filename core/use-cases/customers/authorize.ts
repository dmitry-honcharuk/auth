import { getCustomerTokenPayload } from '../../utils/jwt';

export function authorizeCustomerFactory() {
  return async ({ token, clientId }: Input): Promise<boolean> => {
    try {
      await getCustomerTokenPayload(token, clientId);

      return true;
    } catch (error) {
      return false;
    }
  };
}

type Input = {
  token: string;
  clientId: string;
};
