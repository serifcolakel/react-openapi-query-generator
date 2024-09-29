import { AuthModel } from "@/types/models";
import {
  createRecord,
  deleteRecord,
  readRecord,
  updateRecord,
} from "./creator";

const handleCreateAuth = async (newAuth: AuthModel) => {
  const auth: AuthModel = {
    ...newAuth,
    id: crypto.randomUUID(),
  };

  const response = await createRecord<AuthModel>("auths", auth);

  return response;
};

const handleReadAuth = async (id: string) => {
  const response = await readRecord<AuthModel>("auths", id);

  return response;
};

const handleUpdateAuth = async (id: string, updates: Partial<AuthModel>) => {
  const response = await updateRecord<AuthModel>("auths", id, updates);

  return response;
};

const handleDeleteAuth = async (id: string) => {
  const response = await deleteRecord("auths", id);

  return response;
};

export { handleCreateAuth, handleReadAuth, handleUpdateAuth, handleDeleteAuth };
