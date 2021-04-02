import { TokenPayload, UserAuthenticationReducerState } from './types';
import { authenticateUser } from './actions';
import { C4CAction } from '../../store';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../utils/asyncRequest';
import { ApiError } from '../../utils/error';

export const initialUserState: UserAuthenticationReducerState = {
  tokens: AsyncRequestNotStarted<TokenPayload, ApiError>(),
};

const userAuthenticationRequestReducer = generateAsyncRequestReducer<
  TokenPayload,
  ApiError
>(authenticateUser.key);

const reducers = (
  state: UserAuthenticationReducerState = initialUserState,
  action: C4CAction,
): UserAuthenticationReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        tokens: userAuthenticationRequestReducer(state.tokens, action),
      };
    default:
      return state;
  }
};

export default reducers;
