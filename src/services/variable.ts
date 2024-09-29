import { VariableModel } from "@/types/models";
import {
  createRecord,
  deleteRecord,
  readRecord,
  updateRecord,
} from "./creator";

const handleCreateVariable = async (newVariable: VariableModel) => {
  const variable: VariableModel = {
    ...newVariable,
    id: crypto.randomUUID(),
  };

  const response = await createRecord<VariableModel>("variables", variable);

  return response;
};

const handleReadVariable = async (id: string) => {
  const response = await readRecord<VariableModel>("variables", id);

  return response;
};

const handleUpdateVariable = async (
  id: string,
  updates: Partial<VariableModel>
) => {
  const response = await updateRecord<VariableModel>("variables", id, updates);

  return response;
};

const handleDeleteVariable = async (id: string) => {
  const response = await deleteRecord("variables", id);

  return response;
};

export {
  handleCreateVariable,
  handleReadVariable,
  handleUpdateVariable,
  handleDeleteVariable,
};
