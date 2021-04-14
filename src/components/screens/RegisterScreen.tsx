import Link from 'next/link';
import { useRouter } from 'next/router';
import { isEmpty } from 'ramda';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { register as registerUser } from '../../services/auth';
import { AppContext } from '../AppContext';
import { Button } from '../common/Button';
import { Centered } from '../common/Centered';
import { FormField } from '../common/FormField';

type FormState = { email: string; password: string };

export function RegisterScreen() {
  const [error, setError] = useState('');
  const { register, handleSubmit, errors } = useForm<FormState>();
  const router = useRouter();
  const { fetchCurrentUser } = useContext(AppContext);

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
          <FormField
            id='email'
            name='email'
            placeholder='my.name@example.com'
            label='Email'
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
          <Link href='/admin/login'>
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
