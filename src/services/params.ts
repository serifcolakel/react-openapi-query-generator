import { ParamsModel } from "@/types/models";
import {
  createRecord,
  deleteRecord,
  readRecord,
  updateRecord,
} from "./creator";

const handleCreateParams = async (newParams: ParamsModel) => {
  const params: ParamsModel = {
    ...newParams,
    id: crypto.randomUUID(),
  };

  const response = await createRecord<ParamsModel>("params", params);

  return response;
};

const handleReadParams = async (id: string) => {
  const response = await readRecord<ParamsModel>("params", id);

  return response;
};

const handleUpdateParams = async (
  id: string,
  updates: Partial<ParamsModel>
) => {
  const response = await updateRecord<ParamsModel>("params", id, updates);

  return response;
};

const handleDeleteParams = async (id: string) => {
  const response = await deleteRecord("params", id);

  return response;
};

export {
  handleCreateParams,
  handleReadParams,
  handleUpdateParams,
  handleDeleteParams,
};
