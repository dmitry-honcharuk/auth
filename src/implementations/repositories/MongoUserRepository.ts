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
