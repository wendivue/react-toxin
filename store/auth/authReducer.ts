import type { AuthAction, AuthState } from './authTypes';
import { AuthActionTypes } from './authTypes';

const initialState: AuthState = {
  user: null,
  isUserLoading: false,
  userError: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_REQUEST:
      return {
        ...state,
        isUserLoading: true,
        user: null,
        userError: null,
      };
    case AuthActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        user: action.payload,
        userError: null,
      };
    case AuthActionTypes.SIGNIN_ERROR:
      return {
        ...state,
        isUserLoading: false,
        user: null,
        userError: action.payload,
      };
    case AuthActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isUserLoading: true,
        user: null,
        userError: null,
      };
    case AuthActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        user: action.payload,
        userError: null,
      };
    case AuthActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        isUserLoading: false,
        user: null,
        userError: action.payload,
      };
    case AuthActionTypes.UPDATE_USER_STATE:
      return {
        ...state,
        isUserLoading: true,
        user: null,
        userError: null,
      };
    case AuthActionTypes.UPDATE_USER_STATE_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        user: action.payload,
        userError: null,
      };
    case AuthActionTypes.UPDATE_USER_STATE_ERROR:
      return {
        ...state,
        isUserLoading: true,
        user: null,
        userError: action.payload,
      };
    case AuthActionTypes.SET_LOGIN:
      return {
        ...state,
        isUserLoading: true,
        user: null,
        userError: null,
      };
    case AuthActionTypes.SIGN_OUT_REQUEST:
      return {
        ...state,
        isUserLoading: true,
        user: null,
        userError: null,
      };
    case AuthActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        user: null,
        userError: null,
      };
    case AuthActionTypes.SIGN_OUT_ERROR:
      return {
        ...state,
        isUserLoading: false,
        user: null,
        userError: action.payload,
      };
    case AuthActionTypes.UPDATE_USER_LIKES:
      return {
        ...state,
        isUserLoading: true,
        userError: null,
      };
    case AuthActionTypes.SET_LOGIN_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        user: action.payload,
        userError: null,
      };
    case AuthActionTypes.UPDATE_USER_LIKES_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        user: action.payload,
        userError: null,
      };
    case AuthActionTypes.SET_LOGIN_ERROR:
      return {
        ...state,
        isUserLoading: false,
        user: null,
        userError: action.payload,
      };
    case AuthActionTypes.SET_AVATAR:
      return {
        ...state,
        isUserLoading: true,
        user: null,
        userError: null,
      };
    case AuthActionTypes.SET_AVATAR_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        user: action.payload,
        userError: null,
      };
    case AuthActionTypes.SET_AVATAR_ERROR:
      return {
        ...state,
        isUserLoading: false,
        user: null,
        userError: action.payload,
      };
    case AuthActionTypes.UPDATE_USER_LIKES_ERROR:
      return {
        ...state,
        isUserLoading: false,
        user: null,
        userError: action.payload,
      };
    case AuthActionTypes.UPDATE_USER_PASSWORD:
      return {
        ...state,
        isUserLoading: true,
        user: null,
        userError: null,
      };
    case AuthActionTypes.UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        user: action.payload,
        userError: null,
      };
    case AuthActionTypes.UPDATE_USER_PASSWORD_ERROR:
      return {
        ...state,
        isUserLoading: false,
        user: null,
        userError: action.payload,
      };

    case AuthActionTypes.DELETE_USER:
      return {
        ...state,
        isUserLoading: true,
        user: null,
        userError: null,
      };
    case AuthActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        user: action.payload,
        userError: null,
      };
    case AuthActionTypes.DELETE_USER_ERROR:
      return {
        ...state,
        isUserLoading: false,
        user: null,
        userError: action.payload,
      };
    default:
      return state;
  }
};
