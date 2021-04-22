import { isEmpty } from 'ramda';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  fetchCustomerByToken,
  loginCustomer,
  registerCustomer,
} from '../../services/auth';
import { Button } from '../common/Button';
import { Centered } from '../common/Centered';
import { FormField } from '../common/FormField';

type Props = {
  audience: string;
  clientId: string;
};

type FormState = { email: string; password: string };

export enum AuthType {
  Login = 'login',
  Register = 'register',
}

export const CustomerAuthScreen: FC<Props> = ({ audience, clientId }) => {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [authType, setAuthType] = useState(AuthType.Login);
  const { register, handleSubmit, errors } = useForm<FormState>();

  const isLogin = authType === AuthType.Login;

  const onSubmit = async ({ email, password }: FormState) => {
    setPending(true);

    try {
      const authorize = isLogin ? loginCustomer : registerCustomer;

      const { token } = await authorize({ email, password, clientId });
      const user = await fetchCustomerByToken({ token, clientId });

      const message: AuthMessage = {
        auth_token: token,
        user,
      };

      window.opener.postMessage(
        {
          ficdev_auth: message,
        },
        new URL(audience).origin,
      );
    } catch (error) {
      setError(error.message);
    }

    setPending(false);
  };

  return (
    <Centered>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='transform w-11/12 md:w-1/2 lg:w-1/3 max-w-sm -translate-y-1/4'
      >
        <div className='mb-5'>
          <FormField
            id='email'
            name='email'
            placeholder='my.name@example.com'
            label='Email'
            type='email'
            ref={register({ required: 'Email is required' })}
          />
        </div>

        <div>
          <FormField
            id='password'
            name='password'
            placeholder='.mYsu_per-secure password! yup'
            label='Password'
            type='password'
            ref={register({ required: 'Password is required' })}
          />
        </div>

        <div className='relative flex justify-between mt-3'>
          <button
            className='focus:outline-none'
            type='button'
            onClick={() =>
              setAuthType((type) =>
                type === AuthType.Login ? AuthType.Register : AuthType.Login,
              )
            }
          >
            {isLogin ? 'I don’t have an account' : 'I have an account'}
          </button>
          <Button type='submit' disabled={pending}>
            {isLogin ? 'Sign in' : 'Sign up'}
          </Button>
          {(error || !isEmpty(errors)) && (
            <div className='absolute -bottom-10 w-full text-center text-xs text-pink-600'>
              <code>
                {error || errors.email?.message || errors.password?.message}
              </code>
            </div>
          )}
        </div>
      </form>
    </Centered>
  );
};

type AuthMessage = {
  auth_token: string;
  user: { id: string };
};
