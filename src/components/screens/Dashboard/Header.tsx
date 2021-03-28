import { FunctionComponent, useContext } from 'react';
import { useLogout } from '../../../hooks/useLogout';
import { useNamespaces } from '../../../hooks/useNamespaces';
import { Button } from '../../common/Button';
import { DashboardContext } from './DashboardContext';

export const Header: FunctionComponent = () => {
  const logout = useLogout();
  const { fetched, namespaces } = useNamespaces();
  const { selectNamespace } = useContext(DashboardContext);

  return (
    <header className='flex items-center justify-between px-4 py-2 border-b-2 border-gray-700'>
      <div>
        <span>Namespace:</span>
        <select
          onChange={({ target }) => {
            const ns = namespaces.find(({ id }) => id === target.value);

            if (!ns) return;

            selectNamespace(ns);
          }}
          disabled={!fetched}
          className='border-2 border-gray-700 ml-2 px-3 py-1 appearance-none cursor-pointer'
        >
          <option value='all'>All</option>
          {namespaces.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <Button onClick={logout}>Logout</Button>
    </header>
  );
};
