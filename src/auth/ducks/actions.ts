import { genericAsyncActions } from '../../utils/asyncRequest';
import { TokenPayload } from './types';
import { ApiError } from '../../utils/error';

export const authenticateUser = genericAsyncActions<TokenPayload, ApiError>();

export const logoutUser = genericAsyncActions<void, void>();

export type UserAuthenticationActions =
  | ReturnType<typeof authenticateUser.loading>
  | ReturnType<typeof authenticateUser.loaded>
  | ReturnType<typeof authenticateUser.failed>
  | ReturnType<typeof logoutUser.loading>
  | ReturnType<typeof logoutUser.loaded>
  | ReturnType<typeof logoutUser.failed>;
