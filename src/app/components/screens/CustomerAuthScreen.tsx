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

type FormState = {
  email: string;
  password: string;
  displayName?: string;
};

export enum AuthType {
  Login = 'login',
  Register = 'register',
}

export const CustomerAuthScreen: FC<Props> = ({ audience, clientId }) => {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [authType, setAuthType] = useState(AuthType.Login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const isLogin = authType === AuthType.Login;

  const onSubmit = async ({ email, password, displayName }: FormState) => {
    setPending(true);

    try {
      const { token } = isLogin
        ? await loginCustomer({ email, password, clientId })
        : await registerCustomer({ email, password, clientId, displayName });

      const user = await fetchCustomerByToken({ token, clientId });

      const message: AuthMessage = {
        auth_token: token,
        user,
      };

      if (!window.opener) {
        return;
      }

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
        className='transform w-11/12 md:w-1/2 lg:w-1/3 max-w-sm -translate-y-1/5'
      >
        <div className='mb-5'>
          <FormField
            id='email'
            placeholder='my.name@example.com'
            label='Email'
            type='email'
            {...register('email', { required: 'Email is required' })}
          />
        </div>

        <div className='mb-5'>
          <FormField
            id='password'
            placeholder='.mYsu_per-secure password! yup'
            label='Password'
            type='password'
            {...register('password', { required: 'Password is required' })}
          />
        </div>

        {!isLogin && (
          <div>
            <FormField
              id='displayName'
              placeholder='your email will be used instead'
              label='Display name [optional]'
              {...register('displayName')}
            />
          </div>
        )}

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
