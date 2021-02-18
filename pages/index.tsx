import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = () =>
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        console.log(r);

        if (!r.ok) {
          throw r;
        }

        return r;
      })
      .then((r) => r.json())
      .then((r) => {
        setUserId(r.id);
        setError('');
      })
      .catch(async (r) => {
        console.log('NOOO');

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
          <input
            type='text'
            name='email'
            id='email'
            placeholder='Email'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type='text'
            name='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button onClick={createUser}>Create</button>
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
