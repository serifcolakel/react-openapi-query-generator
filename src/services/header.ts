import { HeaderModel } from "@/types/models";
import {
  createRecord,
  deleteRecord,
  readRecord,
  updateRecord,
} from "./creator";

const handleCreateHeader = async (newHeader: HeaderModel) => {
  const header: HeaderModel = {
    ...newHeader,
    id: crypto.randomUUID(),
  };

  const response = await createRecord<HeaderModel>("headers", header);

  return response;
};

const handleReadHeader = async (id: string) => {
  const response = await readRecord<HeaderModel>("headers", id);

  return response;
};

const handleUpdateHeader = async (
  id: string,
  updates: Partial<HeaderModel>
) => {
  const response = await updateRecord<HeaderModel>("headers", id, updates);

  return response;
};

const handleDeleteHeader = async (id: string) => {
  const response = await deleteRecord("headers", id);

  return response;
};

export {
  handleCreateHeader,
  handleReadHeader,
  handleUpdateHeader,
  handleDeleteHeader,
};
