import { initDB } from "@/lib/db";
import { BaseServiceResponse } from "@/types";

export const createRecord = async <T>(
  storeName: string,
  record: T
): Promise<BaseServiceResponse<T>> => {
  try {
    const db = await initDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.add(record);

    return {
      data: record,
      message: `${storeName} created successfully`,
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: `Failed to create ${storeName}`,
      success: false,
      details: String(error),
    };
  }
};

export const readRecord = async <T>(
  storeName: string,
  id: string
): Promise<BaseServiceResponse<T>> => {
  try {
    const db = await initDB();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const data = await store.get(id);

    if (data) {
      return { data, message: `${storeName} found`, success: true };
    } else {
      return { data: null, message: `${storeName} not found`, success: false };
    }
  } catch (error) {
    return {
      data: null,
      message: `Failed to read ${storeName}`,
      success: false,
      details: String(error),
    };
  }
};

export const updateRecord = async <T>(
  storeName: string,
  id: string,
  updates: Partial<T>
): Promise<BaseServiceResponse<T>> => {
  try {
    const db = await initDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const record = await store.get(id);

    if (record) {
      const updatedRecord = { ...record, ...updates };
      await store.put(updatedRecord);
      return {
        data: updatedRecord,
        message: `${storeName} updated successfully`,
        success: true,
      };
    } else {
      return { data: null, message: `${storeName} not found`, success: false };
    }
  } catch (error) {
    return {
      data: null,
      message: `Failed to update ${storeName}`,
      success: false,
      details: String(error),
    };
  }
};

export const deleteRecord = async (
  storeName: string,
  id: string
): Promise<BaseServiceResponse<null>> => {
  try {
    const db = await initDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.delete(id);

    return {
      data: null,
      message: `${storeName} deleted successfully`,
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: `Failed to delete ${storeName}`,
      success: false,
      details: String(error),
    };
  }
};
