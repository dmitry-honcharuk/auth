import { CustomerAuthDTO, customerToAuthDTO } from '../../entities/customer';
import { getCustomerTokenPayload } from '../../utils/jwt';

export function authorizeCustomerFactory() {
  return async ({
    token,
    clientId,
  }: Input): Promise<null | CustomerAuthDTO> => {
    try {
      const payload = await getCustomerTokenPayload(token, clientId);

      return customerToAuthDTO(payload);
    } catch (error) {
      return null;
    }
  };
}

type Input = {
  token: string;
  clientId: string;
};
