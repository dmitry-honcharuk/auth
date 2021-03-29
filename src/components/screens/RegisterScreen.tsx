import Link from 'next/link';
import { useRouter } from 'next/router';
import { isEmpty } from 'ramda';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { register as registerUser } from '../../services/auth';
import { AuthContext } from '../AppContext';
import { Button } from '../common/Button';
import { Centered } from '../common/Centered';

type FormState = { email: string; password: string };

export function RegisterScreen() {
  const [error, setError] = useState('');
  const { register, handleSubmit, errors } = useForm<FormState>();
  const router = useRouter();
  const { fetchCurrentUser } = useContext(AuthContext);

  const onSubmit = async (data: FormState) => {
    try {
      await registerUser(data);
      await fetchCurrentUser();

      router.push('/admin');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Centered>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='transform w-11/12 md:w-1/2 lg:w-1/3 max-w-sm'
      >
        <div className='mb-5'>
          <label htmlFor='email' className='block mb-2 cursor-pointer'>
            Email
          </label>
          <input
            id='email'
            name='email'
            placeholder='my.name@example.com'
            ref={register({ required: 'Email is required' })}
            className='w-full px-3 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors'
          />
        </div>

        <div>
          <label htmlFor='password' className='block mb-2 cursor-pointer'>
            Password
          </label>
          <input
            id='password'
            name='password'
            placeholder='.mYsu_per-secure password! yup'
            ref={register({ required: 'Password is required' })}
            className='w-full px-3 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors'
          />
        </div>

        <div className='relative flex justify-between mt-3'>
          <Link href='/admin/sign-in'>
            <a>I have an account</a>
          </Link>
          <Button type='submit'>Sign up</Button>

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
}
