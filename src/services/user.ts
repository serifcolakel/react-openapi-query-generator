import { UserModel } from "@/types/models";
import {
  createRecord,
  deleteRecord,
  readRecord,
  updateRecord,
} from "./creator";

const handleCreateUser = async (newUser: UserModel) => {
  const user: UserModel = {
    ...newUser,
    id: crypto.randomUUID(),
  };

  const response = await createRecord<UserModel>("users", user);

  return response;
};

const handleReadUser = async (id: string) => {
  const response = await readRecord<UserModel>("users", id);

  return response;
};

const handleUpdateUser = async (id: string, updates: Partial<UserModel>) => {
  const response = await updateRecord<UserModel>("users", id, updates);

  return response;
};

const handleDeleteUser = async (id: string) => {
  const response = await deleteRecord("users", id);

  return response;
};

export { handleCreateUser, handleReadUser, handleUpdateUser, handleDeleteUser };
