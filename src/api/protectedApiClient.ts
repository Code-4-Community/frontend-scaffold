import AppAxiosInstance from '../auth/axios';
import { UserData } from '../auth/ducks/types';

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
  readonly deleteUser: (request: { password: string }) => Promise<void>;
  readonly getUserData: () => Promise<UserData>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  DELETE_USER = '/api/v1/protected/user/',
  USER_DATA = '/api/v1/protected/user/data',
}

const changePassword = (request: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_PASSWORD,
    request,
  )
    .then((r) => r.data)
    .catch((e) => e);
};

const deleteUser = (request: { password: string }): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.DELETE_USER, request)
    .then((r) => r.data)
    .catch((e) => e);
};

const getUserData = (): Promise<UserData> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.USER_DATA)
    .then((res) => res.data)
    .catch((err) => err);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  deleteUser,
  getUserData,
});

export default Client;
