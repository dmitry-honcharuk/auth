import { sign, SignOptions, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../app/config/env';
import { CustomerAuthDTO } from '../entities/customer';

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

export const getCustomerToken = (payload: CustomerAuthDTO, secret: string) =>
  getToken(payload, secret + JWT_SECRET);

export const getCustomerTokenPayload = (token: string, secret: string) =>
  new Promise<CustomerAuthDTO>((resolve, reject) => {
    verify(token, secret + JWT_SECRET, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      if (!result) {
        reject('No payload');
        return;
      }

      resolve(result as CustomerAuthDTO);
    });
  });
