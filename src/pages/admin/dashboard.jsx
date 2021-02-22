import { useLogout } from '../../hooks/useLogout';

export default function Dashboard() {
  const logout = useLogout();

  return (
    <div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <h1>Dashboard</h1>
    </div>
  );
}
