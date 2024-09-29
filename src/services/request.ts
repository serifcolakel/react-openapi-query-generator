import { RequestModel } from "@/types/models";
import {
  createRecord,
  deleteRecord,
  readRecord,
  updateRecord,
} from "./creator";

const handleCreateRequest = async (newRequest: RequestModel) => {
  const request: RequestModel = {
    ...newRequest,
    id: crypto.randomUUID(),
  };

  const response = await createRecord<RequestModel>("requests", request);

  return response;
};

const handleReadRequest = async (id: string) => {
  const response = await readRecord<RequestModel>("requests", id);

  return response;
};

const handleUpdateRequest = async (
  id: string,
  updates: Partial<RequestModel>
) => {
  const response = await updateRecord<RequestModel>("requests", id, updates);

  return response;
};

const handleDeleteRequest = async (id: string) => {
  const response = await deleteRecord("requests", id);

  return response;
};

export {
  handleCreateRequest,
  handleReadRequest,
  handleUpdateRequest,
  handleDeleteRequest,
};
