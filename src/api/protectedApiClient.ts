import AppAxiosInstance from '../auth/axios';

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
  readonly deleteUser: (request: { password: string }) => Promise<void>;
  readonly postOnboardingForm: (
    request: OnboardingRequestData,
  ) => Promise<OnboardingRequestData>;
  readonly getOnboardingData: () => Promise<OnboardingResponseData[]>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  DELETE_USER = '/api/v1/protected/user/',
}

export interface OnboardingRequestData {
  favoriteColor: string;
  id: number;
}

export interface OnboardingResponseData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const postOnboardingForm = (
  request: OnboardingRequestData,
): Promise<OnboardingRequestData> => {
  return AppAxiosInstance.post(
    'https://jsonplaceholder.typicode.com/posts',
    request,
  )
    .then((r) => r.data)
    .catch((e) => e);
};

const getOnboardingData = (): Promise<OnboardingResponseData[]> => {
  return AppAxiosInstance.get('https://jsonplaceholder.typicode.com/posts')
    .then((r) => r.data)
    .catch((e) => e);
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
