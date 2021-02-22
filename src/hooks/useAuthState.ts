import { useEffect, useState } from 'react';
import { get } from '../services/api';

enum State {
  Pending,
  LoggedIn,
  LoggedOut,
}

export function useAuthState() {
  const [state, setState] = useState(State.Pending);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { user } = await get('/api/current');

        setState(user ? State.LoggedIn : State.LoggedOut);
      } catch (e) {
        setState(State.LoggedOut);
      }
    }

    fetchUser();
  }, []);

  return {
    isLoggedIn: state === State.LoggedIn,
    isPending: state === State.Pending,
  };
}
