import { ResponseModel } from "@/types/models";
import {
  createRecord,
  deleteRecord,
  readRecord,
  updateRecord,
} from "./creator";

const handleCreateResponse = async (newResponse: ResponseModel) => {
  const response: ResponseModel = {
    ...newResponse,
    id: crypto.randomUUID(),
  };

  const result = await createRecord<ResponseModel>("responses", response);

  return result;
};

const handleReadResponse = async (id: string) => {
  const result = await readRecord<ResponseModel>("responses", id);

  return result;
};

const handleUpdateResponse = async (
  id: string,
  updates: Partial<ResponseModel>
) => {
  const result = await updateRecord<ResponseModel>("responses", id, updates);

  return result;
};

const handleDeleteResponse = async (id: string) => {
  const result = await deleteRecord("responses", id);

  return result;
};

export {
  handleCreateResponse,
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
};
