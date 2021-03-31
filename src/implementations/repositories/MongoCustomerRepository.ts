import { ObjectId, WithId } from 'mongodb';
import { CustomerEntity } from '../../../core/entities/customer';
import {
  CustomerRepository,
  SaveUserInput,
} from '../../../core/interfaces/CustomerRepository';
import { getDatabase } from './mongo/mongo.client';

type CustomerSchema = Omit<CustomerEntity, 'id' | 'namespace'> & {
  namespace: ObjectId;
};

async function getCustomersCollection() {
  return (await getDatabase()).collection<WithId<CustomerSchema>>('customers');
}

export function mongoCustomerRepositoryFactory(): CustomerRepository {
  return {
    isEmailTakenInNamespace,
    saveCustomer: saveUser,
    getCustomerByEmail: getUserByEmail,
    getCustomerInNamespaceByEmail: getUserInNamespaceByEmail,
    getCustomerInNamespace: getUsersInNamespace,
    removeNamespaceCustomers,
  };
}

async function isEmailTakenInNamespace(namespaceId: string, email: string) {
  const customers = await getCustomersCollection();

  const customer = await customers.findOne({
    namespace: new ObjectId(namespaceId),
    email,
  });

  return !!customer;
}

async function saveUser({
  email,
  password,
  namespace: namespaceId,
}: SaveUserInput): Promise<CustomerEntity> {
  const customers = await getCustomersCollection();

  const customer = {
    email,
    password,
    namespace: namespaceId,
  };

  const entry = await customers.insertOne({
    ...customer,
    namespace: new ObjectId(namespaceId),
  });

  return {
    id: entry.insertedId.toHexString(),
    ...customer,
  };
}

async function getUserByEmail(email: string): Promise<CustomerEntity | null> {
  const customers = await getCustomersCollection();

  const entry = await customers.findOne({ email });

  if (!entry) return null;

  const { _id, namespace, ...user } = entry;

  return {
    id: _id.toHexString(),
    namespace: namespace.toHexString(),
    ...user,
  };
}

async function getUserInNamespaceByEmail(
  namespaceId: string,
  email: string,
): Promise<CustomerEntity | null> {
  const customers = await getCustomersCollection();

  const entry = await customers.findOne({
    email,
    namespace: new ObjectId(namespaceId),
  });

  if (!entry) return null;

  const { _id, namespace, ...user } = entry;

  return {
    id: _id.toHexString(),
    namespace: namespace.toHexString(),
    ...user,
  };
}

async function getUsersInNamespace(
  namespaceId: string,
): Promise<CustomerEntity[]> {
  const customers = await getCustomersCollection();

  return customers
    .find({ namespace: new ObjectId(namespaceId) })
    .map(({ _id, namespace, ...user }) => ({
      id: _id.toHexString(),
      namespace: namespace.toHexString(),
      ...user,
    }))
    .toArray();
}

async function removeNamespaceCustomers(namespaceId: string): Promise<void> {
  const customers = await getCustomersCollection();

  await customers.deleteMany({ namespace: new ObjectId(namespaceId) });
}
