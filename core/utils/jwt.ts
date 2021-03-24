import { sign, SignOptions } from 'jsonwebtoken';

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
