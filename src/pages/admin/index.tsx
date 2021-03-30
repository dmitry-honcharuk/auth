import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { NamespaceEntity } from '../../../core/entities/namespace';
import { createListNamespacesUseCase } from '../../../core/use-cases/users/list-namespaces';
import { Button } from '../../components/common/Button';
import { DashboardScreen } from '../../components/screens/Dashboard/DashboardScreen';
import { namespaceRepository } from '../../dependencies/repositories';

export default function Dashboard({ namespaces }: Props) {
  const header = (
    <div className='text-right'>
      <Link href='/admin/namespace/new'>
        <a>
          <Button color='primary'>Create</Button>
        </a>
      </Link>
    </div>
  );

  return (
    <DashboardScreen header={header}>
      <ul className='px-2 pt-6 flex'>
        {namespaces.map((namespace) => (
          <li key={namespace.id} className='mx-2 mb-2'>
            <Link href={`/admin/namespace/${namespace.id}`}>
              <a className='inline-block px-2 py-2 border border-black rounded-sm'>
                {namespace.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </DashboardScreen>
  );
}

type Props = {
  namespaces: NamespaceEntity[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const namespaces = await createListNamespacesUseCase({
    namespaceRepository,
  })();

  return {
    props: { namespaces },
  };
};
