import { Nullable } from "./helpers";

/**
 * @description: Base service response type
 */
export type BaseServiceResponse<T> = {
  data: Nullable<T>;
  message: string;
  success: boolean;
  details?: string;
};

export interface UserModel {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EnvironmentModel {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VariableModel {
  id: string;
  name: string;
  value: string;
  environmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionModel {
  id: string;
  name: string;
  parentId?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestModel {
  id: string;
  name: string;
  method: string;
  url: string;
  body: string;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HeaderModel {
  id: string;
  key: string;
  value: string;
  requestId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParamsModel {
  id: string;
  key: string;
  value: string;
  requestId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseModel {
  id: string;
  body: string;
  requestId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthModel {
  id: string;
  type: string;
  token: string;
  requestId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BodyModel {
  id: string;
  type: string;
  content: string;
  requestId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestModel {
  id: string;
  script: string;
  requestId: string;
  createdAt: Date;
  updatedAt: Date;
}
