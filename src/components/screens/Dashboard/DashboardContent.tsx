import cn from 'classnames';
import { FunctionComponent, useContext, useState } from 'react';
import { DashboardContext } from './DashboardContext';

enum Tab {
  Users,
  Settings,
}

export const DashboardContent: FunctionComponent = () => {
  const { users, selectedNamespace } = useContext(DashboardContext);
  const [tab, setTab] = useState(Tab.Users);

  if (!selectedNamespace) {
    return <p className={classes.main}>Please select namespace</p>;
  }

  return (
    <div className={classes.root}>
      <aside className={classes.sidebar}>
        <button
          className={cn(classes.tab, {
            [classes.activeTab]: tab === Tab.Users,
          })}
          onClick={() => setTab(Tab.Users)}
        >
          Users
        </button>
        <button
          className={cn(classes.tab, {
            [classes.activeTab]: tab === Tab.Settings,
          })}
          onClick={() => setTab(Tab.Settings)}
        >
          Settings
        </button>
      </aside>
      <main className={classes.main}>
        {tab === Tab.Users && (
          <table>
            <thead>
              <tr>
                <th className={classes.th}>email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, email }) => (
                <tr key={id}>
                  <td>{email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === Tab.Settings && (
          <>
            <b>Client ID</b>
            <br />
            <span className={classes.clientId}>
              {selectedNamespace.clientId}
            </span>
          </>
        )}
      </main>
    </div>
  );
};

const classes = {
  root: 'flex',
  sidebar: cn('border-r-2', 'border-gray-700', 'pt-5', 'flex', 'flex-col'),
  main: 'p-4',
  th: 'text-left',
  tab: cn('p-2', 'text-left', 'focus:outline-none'),
  activeTab: 'bg-gray-200',
  clientId: cn('inline-block', 'mt-1', 'p-2', 'bg-gray-200'),
};
