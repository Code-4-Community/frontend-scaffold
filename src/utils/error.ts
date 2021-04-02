import { AxiosError } from 'axios';
import { authenticateUser } from '../auth/ducks/actions';

export interface ApiError {
  readonly message: string;
  readonly code?: string;
  readonly type: ApiErrorTypes;
}

export enum ApiErrorTypes {
  NETWORK_ERROR = 'NETWORK_ERROR',
  GENERIC_API_ERROR = 'GENERIC_API_ERROR',
}

export const axiosErrorToApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    return {
      message: error.response.data,
      code: error.code,
      type: ApiErrorTypes.GENERIC_API_ERROR,
    };
  } else if (error.request) {
    return {
      message: error.message,
      code: error.code,
      type: ApiErrorTypes.NETWORK_ERROR,
    };
  } else {
    return {
      message: error.message,
      code: error.code,
      type: ApiErrorTypes.GENERIC_API_ERROR,
    };
  }
};
