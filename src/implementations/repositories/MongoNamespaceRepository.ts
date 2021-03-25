import { WithId } from 'mongodb';
import { NamespaceEntity } from '../../../core/entities/namespace';
import { ClientIdNotUniqueError } from '../../../core/errors/ClientIdNotUniqueError';
import {
  AddNamespaceInput,
  NamespaceRepository,
} from '../../../core/interfaces/NamespaceRepository';
import { getDatabase } from './mongo/mongo.client';

type NamespaceSchema = Omit<NamespaceEntity, 'id'>;

export function buildMongoNamespaceRepository(): NamespaceRepository {
  return {
    getNamespaces,
    addNamespace,
    getNamespaceByClientId,
  };
}

async function getNamespaces() {
  const collection = await getCollection();

  const entries = collection.find({});

  return entries
    .map(({ _id, ...namespace }) => ({
      id: _id.toHexString(),
      ...namespace,
    }))
    .toArray();
}

async function addNamespace({ name, clientId }: AddNamespaceInput) {
  const collection = await getCollection();

  const namespace = { name, clientId };

  try {
    const entry = await collection.insertOne({ ...namespace });

    return {
      id: entry.insertedId.toHexString(),
      ...namespace,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new ClientIdNotUniqueError(clientId);
    }

    throw error;
  }
}

async function getNamespaceByClientId(
  clientId: string,
): Promise<NamespaceEntity | null> {
  const collection = await getCollection();

  const entry = await collection.findOne({ clientId });

  if (!entry) return null;

  const { _id, ...namespace } = entry;

  return {
    id: _id.toHexString(),
    ...namespace,
  };
}

async function getCollection() {
  return (await getDatabase()).collection<WithId<NamespaceSchema>>(
    'namespaces',
  );
}
