import { EnvironmentModel } from "@/types/models";
import {
  createRecord,
  deleteRecord,
  readRecord,
  updateRecord,
} from "./creator";

const handleCreateEnvironment = async (newEnvironment: EnvironmentModel) => {
  const environment: EnvironmentModel = {
    ...newEnvironment,
    id: crypto.randomUUID(),
  };

  const response = await createRecord<EnvironmentModel>(
    "environments",
    environment
  );

  return response;
};

const handleReadEnvironment = async (id: string) => {
  const response = await readRecord<EnvironmentModel>("environments", id);

  return response;
};

const handleUpdateEnvironment = async (
  id: string,
  updates: Partial<EnvironmentModel>
) => {
  const response = await updateRecord<EnvironmentModel>(
    "environments",
    id,
    updates
  );

  return response;
};

const handleDeleteEnvironment = async (id: string) => {
  const response = await deleteRecord("environments", id);

  return response;
};

export {
  handleCreateEnvironment,
  handleReadEnvironment,
  handleUpdateEnvironment,
  handleDeleteEnvironment,
};
