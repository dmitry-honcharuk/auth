import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useNamespaces } from '../../../hooks/useNamespaces';
import { Button } from '../../common/Button';

export const Header: FunctionComponent = () => {
  const {
    push,
    query: { namespaceId },
  } = useRouter();
  const { fetched, namespaces } = useNamespaces();

  return (
    <div className='flex justify-between items-center ml-1.5'>
      <div>
        <span>Namespace:</span>
        <select
          onChange={async ({ target }) => {
            await push(`/admin/namespace/${target.value}`);
          }}
          disabled={!fetched}
          className='border-2 border-gray-700 ml-2 px-3 py-1 appearance-none cursor-pointer'
        >
          {namespaces.map(({ id, name }) => (
            <option key={id} value={id} selected={id === namespaceId}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <Link href='/admin/namespace/new'>
        <a>
          <Button color='primary'>Create</Button>
        </a>
      </Link>
    </div>
  );
};
