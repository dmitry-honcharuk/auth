import router from 'next/router';
import { logout } from '../services/auth';

export function useLogout() {
  return () => {
    logout().then(() => router.push('/admin/login'));
  };
}
