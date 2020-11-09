import {
  LoginRequest,
  SignupRequest,
  TokenResponse,
  UserAuthenticationThunkAction,
} from './types';
import { authenticateUser, logoutUser } from './actions';

export const login = (
  loginRequest: LoginRequest,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient, tokenService }): Promise<void> => {
    return authClient
      .login(loginRequest)
      .then((response: TokenResponse) => {
        tokenService.setAccessToken(response.accessToken);
        tokenService.setRefreshToken(response.refreshToken);
        dispatch(
          authenticateUser.loaded({
            userId: tokenService.getUserID(),
            privilegeLevel: tokenService.getPrivilegeLevel(),
          }),
        );
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error));
      });
  };
};

export const signup = (
  signupRequest: SignupRequest,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient, tokenService }): Promise<void> => {
    return authClient
      .signup(signupRequest)
      .then((response) => {
        tokenService.setAccessToken(response.accessToken);
        tokenService.setRefreshToken(response.refreshToken);
        dispatch(
          authenticateUser.loaded({
            userId: tokenService.getUserID(),
            privilegeLevel: tokenService.getPrivilegeLevel(),
          }),
        );
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error));
      });
  };
};

export const logout = (): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient, tokenService }): Promise<void> => {
    const refreshToken = tokenService.getRefreshToken();
    if (refreshToken === null) {
      dispatch(logoutUser.loaded());
      return Promise.resolve();
    }
    return authClient
      .logout(refreshToken)
      .then(() => {
        tokenService.removeAccessToken();
        tokenService.removeRefreshToken();
        dispatch(logoutUser.loaded());
      })
      .catch(() => {
        tokenService.removeAccessToken();
        tokenService.removeRefreshToken();
        dispatch(logoutUser.failed());
      });
  };
};
