import { useCallback, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/auth';

enum State {
  Pending,
  LoggedIn,
  LoggedOut,
}

export function useAuthState() {
  const [state, setState] = useState(State.Pending);

  const fetchUser = useCallback(async () => {
    try {
      const { user } = await getCurrentUser();

      setState(user ? State.LoggedIn : State.LoggedOut);
    } catch (e) {
      setState(State.LoggedOut);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    isLoggedIn: state === State.LoggedIn,
    isPending: state === State.Pending,
    fetchUser,
  };
}
