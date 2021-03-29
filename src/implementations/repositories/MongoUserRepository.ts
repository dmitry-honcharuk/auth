import { WithId } from 'mongodb';
import { EndUserEntity } from '../../../core/entities/end-user';
import {
  EndUserRepository,
  SaveUserInput,
} from '../../../core/interfaces/EndUserRepository';
import { getDatabase } from './mongo/mongo.client';

type UserSchema = Omit<EndUserEntity, 'id'>;

export function buildMongoUserRepository(): EndUserRepository {
  return {
    isEmailTakenInNamespace,
    saveUser,
    getUserByEmail,
    getUserInNamespaceByEmail,
    getUsersInNamespace,
  };
}

async function getUsersCollection() {
  return (await getDatabase()).collection<WithId<UserSchema>>('users');
}

async function isEmailTakenInNamespace(namespaceId: string, email: string) {
  const users = await getUsersCollection();

  const user = await users.findOne({ namespace: namespaceId, email });

  return !!user;
}

async function saveUser({
  email,
  password,
  namespace,
}: SaveUserInput): Promise<EndUserEntity> {
  const users = await getUsersCollection();

  const user = {
    email,
    password,
    namespace,
  };

  const entry = await users.insertOne({ ...user });

  return {
    id: entry.insertedId.toHexString(),
    ...user,
  };
}

async function getUserByEmail(email: string): Promise<EndUserEntity | null> {
  const users = await getUsersCollection();

  const entry = await users.findOne({ email });

  if (!entry) return null;

  const { _id, ...user } = entry;

  return {
    id: _id.toHexString(),
    ...user,
  };
}

async function getUserInNamespaceByEmail(
  namespace: string,
  email: string,
): Promise<EndUserEntity | null> {
  const users = await getUsersCollection();

  const entry = await users.findOne({ email, namespace });

  if (!entry) return null;

  const { _id, ...user } = entry;

  return {
    id: _id.toHexString(),
    ...user,
  };
}

async function getUsersInNamespace(
  namespaceId: string,
): Promise<EndUserEntity[]> {
  const users = await getUsersCollection();

  return users
    .find({ namespace: namespaceId })
    .map(({ _id, ...user }) => ({
      id: _id.toHexString(),
      ...user,
    }))
    .toArray();
}
