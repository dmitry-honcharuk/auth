import { ObjectId, WithId } from 'mongodb';
import { NamespaceEntity } from '../../../core/entities/namespace';
import { ClientIdNotUniqueError } from '../../../core/errors/ClientIdNotUniqueError';
import {
  AddNamespaceInput,
  GetNamespacesOutDTO,
  NamespaceRepository,
} from '../../../core/interfaces/NamespaceRepository';
import { getDatabase } from './mongo/mongo.client';

type NamespaceSchema = Omit<NamespaceEntity, 'id' | 'creator'> & {
  creator: ObjectId;
};

async function getCollection() {
  return (await getDatabase()).collection<WithId<NamespaceSchema>>(
    'namespaces',
  );
}

export function buildMongoNamespaceRepository(): NamespaceRepository {
  return {
    getUserNamespaces: getNamespaces,
    addNamespace,
    getNamespaceByClientId,
    getNamespaceById,
    removeNamespaceById,
  };
}

async function getNamespaces(
  creatorId: string,
): Promise<GetNamespacesOutDTO[]> {
  const collection = await getCollection();

  const entries = collection.find({
    creator: new ObjectId(creatorId),
  });

  return entries
    .map(
      (entry): GetNamespacesOutDTO => {
        const { _id, creator, ...ns } = entry;

        return {
          id: _id.toHexString(),
          ...ns,
        };
      },
    )
    .toArray();
}

async function addNamespace(
  creatorId: string,
  { clientId, name }: AddNamespaceInput,
): Promise<NamespaceEntity> {
  const collection = await getCollection();

  const namespace = { name, clientId, creator: creatorId };

  try {
    const entry = await collection.insertOne({
      ...namespace,
      creator: new ObjectId(creatorId),
    });

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
    creator: namespace.creator.toHexString(),
  };
}

async function getNamespaceById(
  namespaceId: string,
): Promise<NamespaceEntity | null> {
  const collection = await getCollection();

  const entry = await collection.findOne({ _id: new ObjectId(namespaceId) });

  if (!entry) return null;

  const { _id, ...namespace } = entry;

  return {
    id: _id.toHexString(),
    ...namespace,
    creator: namespace.creator.toHexString(),
  };
}

async function removeNamespaceById(namespaceId: string): Promise<void> {
  const collection = await getCollection();

  await collection.deleteOne({ _id: new ObjectId(namespaceId) });
}
