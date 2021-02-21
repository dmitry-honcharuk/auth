import { AuthApi } from '../interfaces/AuthApi';

export function createRegistrationUseCase({ authApi }: Dependencies) {
  return async ({ email, password }: Input) => {};
}

type Input = {
  email: string;
  password: string;
};
type Dependencies = {
  authApi: AuthApi;
};
