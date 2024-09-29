import { TestModel } from "@/types/models";
import {
  createRecord,
  deleteRecord,
  readRecord,
  updateRecord,
} from "./creator";

const handleCreateTest = async (newTest: TestModel) => {
  const test: TestModel = {
    ...newTest,
    id: crypto.randomUUID(),
  };

  const response = await createRecord<TestModel>("tests", test);

  return response;
};

const handleReadTest = async (id: string) => {
  const response = await readRecord<TestModel>("tests", id);

  return response;
};

const handleUpdateTest = async (id: string, updates: Partial<TestModel>) => {
  const response = await updateRecord<TestModel>("tests", id, updates);

  return response;
};

const handleDeleteTest = async (id: string) => {
  const response = await deleteRecord("tests", id);

  return response;
};

export { handleCreateTest, handleReadTest, handleUpdateTest, handleDeleteTest };
