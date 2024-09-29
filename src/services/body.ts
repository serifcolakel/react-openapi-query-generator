import { BodyModel } from "@/types/models";
import {
  createRecord,
  deleteRecord,
  readRecord,
  updateRecord,
} from "./creator";

const handleCreateBody = async (newBody: BodyModel) => {
  const body: BodyModel = {
    ...newBody,
    id: crypto.randomUUID(),
  };

  const response = await createRecord<BodyModel>("bodies", body);

  return response;
};

const handleReadBody = async (id: string) => {
  const response = await readRecord<BodyModel>("bodies", id);

  return response;
};

const handleUpdateBody = async (id: string, updates: Partial<BodyModel>) => {
  const response = await updateRecord<BodyModel>("bodies", id, updates);

  return response;
};

const handleDeleteBody = async (id: string) => {
  const response = await deleteRecord("bodies", id);

  return response;
};

export { handleCreateBody, handleReadBody, handleUpdateBody, handleDeleteBody };
