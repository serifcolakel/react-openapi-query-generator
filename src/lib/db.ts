// db.ts
import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "RequestDB";
const DB_VERSION = 1;

export const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create object stores for each model
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("environments")) {
        db.createObjectStore("environments", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("variables")) {
        db.createObjectStore("variables", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("collections")) {
        db.createObjectStore("collections", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("requests")) {
        db.createObjectStore("requests", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("headers")) {
        db.createObjectStore("headers", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("params")) {
        db.createObjectStore("params", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("responses")) {
        db.createObjectStore("responses", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("auths")) {
        db.createObjectStore("auths", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("bodies")) {
        db.createObjectStore("bodies", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("tests")) {
        db.createObjectStore("tests", { keyPath: "id" });
      }
    },
  });
};
