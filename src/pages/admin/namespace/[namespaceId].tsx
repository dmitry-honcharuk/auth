import { GetServerSideProps } from 'next';
import { getCurrentUser } from '../../../app/backend/utils/getCurrentUser';
import { DashboardContent } from '../../../app/components/screens/Dashboard/DashboardContent';
import { DashboardScreen } from '../../../app/components/screens/Dashboard/DashboardScreen';
import { Header } from '../../../app/components/screens/Dashboard/Header';
import {
  customerRepository,
  namespaceRepository,
} from '../../../app/dependencies/repositories';
import { PublicCustomer } from '../../../core/entities/customer';
import { NamespaceEntity } from '../../../core/entities/namespace';
import { getNamespaceFactory } from '../../../core/use-cases/users/get-namespace';
import { listNamespaceCustomersFactory } from '../../../core/use-cases/users/list-namespace-customers';

export default function Dashboard({ namespace, customers }: Props) {
  return (
    <DashboardScreen header={<Header />}>
      <DashboardContent namespace={namespace} customers={customers} />
    </DashboardScreen>
  );
}

type Props = {
  customers: PublicCustomer[];
  namespace: NamespaceEntity;
};
type Params = { namespaceId: string };

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
  req,
  res,
}) => {
  try {
    const user = await getCurrentUser(req, res);
    const namespaceId = params?.namespaceId;

    if (!namespaceId) {
      return { notFound: true };
    }

    const [customers, namespace] = await Promise.all([
      listNamespaceCustomersFactory({
        customerRepository,
        namespaceRepository,
      })({
        namespaceId,
        currentUserId: user.id,
      }),
      getNamespaceFactory({ namespaceRepository })({
        namespaceId,
        currentUserId: user.id,
      }),
    ]);

    if (!namespace) {
      return { notFound: true };
    }

    return {
      props: { customers, namespace },
    };
  } catch (e) {
    return { notFound: true };
  }
};
