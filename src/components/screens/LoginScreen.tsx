import { useRouter } from 'next/router';
import { isEmpty } from 'ramda';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../services/auth';
import styles from './auth-page.module.css';
import { Centered } from './common/Centered';

type FormState = { email: string; password: string };

export function LoginScreen() {
  const [error, setError] = useState('');
  const { register, handleSubmit, errors } = useForm<FormState>();
  const router = useRouter();

  const onSubmit = async (data: FormState) => {
    try {
      await login(data);
      router.push('/admin/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Centered>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor='email' className={styles.label}>
            Email
          </label>
          <input
            id='email'
            name='email'
            placeholder='Email'
            ref={register({ required: 'Email is required' })}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor='password' className={styles.label}>
            Password
          </label>
          <input
            id='password'
            name='password'
            placeholder='Password'
            ref={register({ required: 'Password is required' })}
            className={styles.input}
          />
        </div>

        <div className={styles.footer}>
          <button type='submit'>Sign in</button>

          {(error || !isEmpty(errors)) && (
            <div className={styles.error}>
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
