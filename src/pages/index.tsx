import Head from 'next/head';
import { useReducer, useState } from 'react';
import { post } from '../services/api';
import styles from '../styles/Home.module.css';

const initialAuthState = {
  loginEmail: '',
  loginPassword: '',
  registrationEmail: '',
  registrationPassword: '',
};

enum ActionType {
  LoginEmailUpdate = 'login-email-update',
  LoginPasswordUpdate = 'login-password-update',
  RegistrationEmailUpdate = 'registration-email-update',
  RegistrationPasswordUpdate = 'registration-password-update',
}

type Action =
  | { type: ActionType.LoginEmailUpdate; payload: string }
  | { type: ActionType.LoginPasswordUpdate; payload: string }
  | { type: ActionType.RegistrationEmailUpdate; payload: string }
  | { type: ActionType.RegistrationPasswordUpdate; payload: string };

type AuthState = typeof initialAuthState;

const authReducer = (state: AuthState, action: Action): AuthState => {
  if (action.type === ActionType.LoginEmailUpdate) {
    return { ...state, loginEmail: action.payload };
  }

  if (action.type === ActionType.LoginPasswordUpdate) {
    return { ...state, loginPassword: action.payload };
  }
  if (action.type === ActionType.RegistrationEmailUpdate) {
    return { ...state, registrationEmail: action.payload };
  }

  if (action.type === ActionType.RegistrationPasswordUpdate) {
    return { ...state, registrationPassword: action.payload };
  }

  throw new Error();
};

export default function Home() {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const createUser = () =>
    post('/api/register', {
      email: state.registrationEmail,
      password: state.registrationPassword,
    })
      .then((r) => {
        setUserId(r.id);
        setError('');
      })
      .catch(async (r) => {
        if (r.status < 500) {
          const { message } = await r.json();
          setError(message);
          setUserId('');
        }
      });

  const login = () =>
    post('/api/login', {
      email: state.loginEmail,
      password: state.loginPassword,
    })
      .then((r) => {
        setUserId(r.user.id);
        setError('');
      })
      .catch(async (r) => {
        if (r.status < 500) {
          const { message } = await r.json();
          setError(message);
          setUserId('');
        }
      });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Next.tsx!</a>
        </h1>

        <div>
          <h2>Registration</h2>
          <input
            type='text'
            name='email'
            id='regsitration-email'
            placeholder='Email'
            value={state.registrationEmail}
            onChange={({ target }) =>
              dispatch({
                type: ActionType.RegistrationEmailUpdate,
                payload: target.value,
              })
            }
          />
          <input
            type='text'
            name='password'
            id='regsitration-password'
            placeholder='Password'
            value={state.registrationPassword}
            onChange={({ target }) =>
              dispatch({
                type: ActionType.RegistrationPasswordUpdate,
                payload: target.value,
              })
            }
          />
          <button onClick={createUser}>Register</button>
          <h2>Login</h2>
          <input
            type='text'
            name='email'
            id='login-email'
            placeholder='Email'
            value={state.loginEmail}
            onChange={({ target }) =>
              dispatch({
                type: ActionType.LoginEmailUpdate,
                payload: target.value,
              })
            }
          />
          <input
            type='text'
            name='password'
            id='login-password'
            placeholder='Password'
            value={state.loginPassword}
            onChange={({ target }) =>
              dispatch({
                type: ActionType.LoginPasswordUpdate,
                payload: target.value,
              })
            }
          />
          <button onClick={login}>Login</button>
        </div>
        {userId && <div>User id: {userId}</div>}
        {error && <div>Error: {error}</div>}
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
