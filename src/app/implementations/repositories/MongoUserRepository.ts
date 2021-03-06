import { WithId } from 'mongodb';
import { UserEntity } from '../../../core/entities/user';
import {
  SaveUserInput,
  UserRepository,
} from '../../../core/interfaces/UserRepository';
import { getDatabase } from './mongo/mongo.client';

type UserSchema = Omit<UserEntity, 'id'>;

export function mongoUserRepositoryFactory(): UserRepository {
  return {
    isEmailTaken,
    saveUser,
    getUserByEmail,
  };
}

async function getUsersCollection() {
  return (await getDatabase()).collection<WithId<UserSchema>>('users');
}

async function isEmailTaken(email: string) {
  const users = await getUsersCollection();

  const user = await users.findOne({ email });

  return !!user;
}

async function saveUser({
  email,
  password,
}: SaveUserInput): Promise<UserEntity> {
  const users = await getUsersCollection();

  const user = {
    email,
    password,
  };

  const entry = await users.insertOne({ ...user });

  return {
    id: entry.insertedId.toHexString(),
    ...user,
  };
}

async function getUserByEmail(email: string): Promise<UserEntity | null> {
  const collection = await getUsersCollection();

  const entry = await collection.findOne({ email });

  if (!entry) return null;

  const { _id, ...user } = entry;

  return {
    id: _id.toHexString(),
    ...user,
  };
}
