import { GetServerSideProps } from 'next';
import { PublicCustomer } from '../../../../core/entities/customer';
import { NamespaceEntity } from '../../../../core/entities/namespace';
import { getNamespaceFactory } from '../../../../core/use-cases/users/get-namespace';
import { listNamespaceCustomersFactory } from '../../../../core/use-cases/users/list-namespace-customers';
import { DashboardContent } from '../../../components/screens/Dashboard/DashboardContent';
import { DashboardScreen } from '../../../components/screens/Dashboard/DashboardScreen';
import { Header } from '../../../components/screens/Dashboard/Header';
import {
  customerRepository,
  namespaceRepository,
} from '../../../dependencies/repositories';

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
}) => {
  const namespaceId = params?.namespaceId;

  if (!namespaceId) {
    return { notFound: true };
  }

  const [customers, namespace] = await Promise.all([
    listNamespaceCustomersFactory({ customerRepository })({ namespaceId }),
    getNamespaceFactory({ namespaceRepository })({ namespaceId }),
  ]);

  if (!namespace) {
    return { notFound: true };
  }

  return {
    props: { customers, namespace },
  };
};
