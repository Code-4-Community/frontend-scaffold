import AppAxiosInstance from '../auth/axios';

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
  readonly deleteUser: (request: { password: string }) => Promise<void>;
  readonly postOnboardingForm: (
    request: PostRequestData,
  ) => Promise<PostRequestData>;
  readonly getOnboardingData: () => Promise<GetResponseData[]>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  DELETE_USER = '/api/v1/protected/user/',
}

export interface PostRequestData {
  title: string;
  body: string;
  userId: number;
}

export interface GetResponseData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const postOnboardingForm = async (
  request: PostRequestData,
): Promise<PostRequestData> => {
  const res = await AppAxiosInstance.post(
    'https://jsonplaceholder.typicode.com/posts',
    request,
    { headers: { 'Access-Control-Allow-Origin': '*' } },
  );
  return res.data;
};

const getOnboardingData = async (): Promise<GetResponseData[]> => {
  const res = await AppAxiosInstance.get(
    'https://jsonplaceholder.typicode.com/posts',
  );
  return res.data;
};

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

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  deleteUser,
  postOnboardingForm,
  getOnboardingData,
});

export default Client;
