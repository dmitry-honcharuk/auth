import { sign, SignOptions, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../src/config/env';

export const getToken = (
  payload: any,
  secret: string,
  options: SignOptions = {},
): Promise<string> =>
  new Promise((resolve, reject) => {
    sign(payload, secret, options, (error, token) => {
      if (token) {
        resolve(token);
        return;
      }

      reject(error ?? null);
    });
  });

type CustomerTokenPayload = {
  id: string;
};

export const getCustomerToken = (
  payload: CustomerTokenPayload,
  secret: string,
) => getToken(payload, secret + JWT_SECRET);

export const getCustomerTokenPayload = (token: string, secret: string) =>
  new Promise<CustomerTokenPayload>((resolve, reject) => {
    verify(token, secret + JWT_SECRET, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      if (!result) {
        reject('No payload');
        return;
      }

      resolve(result as CustomerTokenPayload);
    });
  });
