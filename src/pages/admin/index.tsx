import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getCurrentUser } from '../../app/backend/utils/getCurrentUser';
import { Button } from '../../app/components/common/Button';
import { DashboardScreen } from '../../app/components/screens/Dashboard/DashboardScreen';
import { namespaceRepository } from '../../app/dependencies/repositories';
import { NamespaceEntity } from '../../core/entities/namespace';
import { createListNamespacesUseCase } from '../../core/use-cases/users/list-namespaces';

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
  namespaces: Omit<NamespaceEntity, 'creator'>[];
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  try {
    const user = await getCurrentUser(req, res);

    const namespaces = await createListNamespacesUseCase({
      namespaceRepository,
    })({
      currentUserId: user.id,
    });

    return {
      props: { namespaces },
    };
  } catch (e) {
    return { notFound: true };
  }
};
