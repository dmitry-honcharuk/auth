import { DashboardScreen } from '../../components/screens/Dashboard/DashboardScreen';
import { useLogout } from '../../hooks/useLogout';

export default function Dashboard() {
  const logout = useLogout();

  return (
    <DashboardScreen>
      <h2>Dashboard Content</h2>
    </DashboardScreen>
  );
}
