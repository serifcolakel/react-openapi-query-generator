import { CollectionModel } from "@/types/models";
import {
  createRecord,
  deleteRecord,
  readRecord,
  updateRecord,
} from "./creator";

const handleCreateCollection = async (newCollection: CollectionModel) => {
  const collection: CollectionModel = {
    ...newCollection,
    id: crypto.randomUUID(),
  };

  const response = await createRecord<CollectionModel>(
    "collections",
    collection
  );

  return response;
};

const handleReadCollection = async (id: string) => {
  const response = await readRecord<CollectionModel>("collections", id);

  return response;
};

const handleUpdateCollection = async (
  id: string,
  updates: Partial<CollectionModel>
) => {
  const response = await updateRecord<CollectionModel>(
    "collections",
    id,
    updates
  );

  return response;
};

const handleDeleteCollection = async (id: string) => {
  const response = await deleteRecord("collections", id);

  return response;
};

export {
  handleCreateCollection,
  handleReadCollection,
  handleUpdateCollection,
  handleDeleteCollection,
};
