import AppAxiosInstance from '../auth/axios';
import { ChangePasswordRequest } from '../containers/settings';

export interface ProtectedApiClient {
  readonly changePassword: (request: ChangePasswordRequest) => Promise<void>;
  readonly deleteUser: (request: { password: string }) => Promise<void>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  DELETE_USER = '/api/v1/protected/user/',
}

const changePassword = (request: ChangePasswordRequest): Promise<void> => {
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

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  deleteUser,
});

export default Client;
