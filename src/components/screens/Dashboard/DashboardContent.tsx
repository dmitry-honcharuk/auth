import cn from 'classnames';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { PublicCustomer } from '../../../../core/entities/customer';
import { NamespaceEntity } from '../../../../core/entities/namespace';
import { deleteNamespace } from '../../../services/namespaces';
import { Button } from '../../common/Button';

enum Tab {
  Customers = 'customers',
  Settings = 'settings',
}

type Props = {
  customers: PublicCustomer[];
  namespace: NamespaceEntity;
};

export const DashboardContent: FC<Props> = ({ namespace, customers }) => {
  const {
    push,
    query: { namespaceId, tab = Tab.Customers },
  } = useRouter();

  const setTab = async (tab: Tab) => {
    await push(`/admin/namespace/${namespaceId}?tab=${tab}`);
  };

  const remove = async () => {
    await deleteNamespace(namespaceId as string);
    await push(`/admin`);
  };

  return (
    <div className={classes.root}>
      <aside className={classes.sidebar}>
        <button
          className={cn(classes.tab, {
            [classes.activeTab]: tab === Tab.Customers,
          })}
          onClick={() => setTab(Tab.Customers)}
        >
          Customers
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
        {tab === Tab.Customers && !customers.length && (
          <span>No customers yet</span>
        )}
        {tab === Tab.Customers && !!customers.length && (
          <table>
            <thead>
              <tr>
                <th className={classes.th}>email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(({ id, email }) => (
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
            <span className={classes.clientId}>{namespace.clientId}</span>
            <div className='mt-3'>
              <Button onClick={remove}>Delete</Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

const classes = {
  root: 'flex',
  sidebar: cn('border-r-2', 'border-gray-700', 'pt-5', 'flex', 'flex-col'),
  main: 'px-4 py-6',
  th: 'text-left',
  tab: cn('p-2', 'text-left', 'focus:outline-none'),
  activeTab: 'bg-gray-200',
  clientId: cn('inline-block', 'mt-1', 'p-2', 'bg-gray-200'),
};
