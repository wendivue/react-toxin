import type { AuthAction, AuthError, User, UserInfo } from './authTypes';
import { AuthActionTypes } from './authTypes';

const authSigninRequest = (signinInfo: {
  email: string;
  password: string;
}): AuthAction => {
  return {
    type: AuthActionTypes.SIGNIN_REQUEST,
    payload: signinInfo,
  };
};

const authSigninSuccess = (user: User): AuthAction => {
  return {
    type: AuthActionTypes.SIGNIN_SUCCESS,
    payload: user,
  };
};

const authSigninError = (error: AuthError): AuthAction => {
  return {
    type: AuthActionTypes.SIGNIN_ERROR,
    payload: error,
  };
};

const authSignupRequest = (signupInfo: {
  email: string;
  password: string;
  userInfo: UserInfo;
}): AuthAction => {
  return {
    type: AuthActionTypes.SIGNUP_REQUEST,
    payload: signupInfo,
  };
};

const authSignupSuccess = (user: User): AuthAction => {
  return {
    type: AuthActionTypes.SIGNUP_SUCCESS,
    payload: user,
  };
};

const authSignupError = (error: AuthError): AuthAction => {
  return {
    type: AuthActionTypes.SIGNUP_ERROR,
    payload: error,
  };
};

const authUpdateUserState = (): AuthAction => {
  return {
    type: AuthActionTypes.UPDATE_USER_STATE,
  };
};

const authUpdateUserStateSuccess = (user: User | null): AuthAction => {
  return {
    type: AuthActionTypes.UPDATE_USER_STATE_SUCCESS,
    payload: user,
  };
};

const authUpdateUserStateError = (error: AuthError): AuthAction => {
  return {
    type: AuthActionTypes.UPDATE_USER_STATE_ERROR,
    payload: error,
  };
};

const authSetLogin = (login: { name: string; surname: string }): AuthAction => {
  return {
    type: AuthActionTypes.SET_LOGIN,
    payload: login,
  };
};

const authSetLoginSuccess = (user: User | null): AuthAction => {
  return {
    type: AuthActionTypes.SET_LOGIN_SUCCESS,
    payload: user,
  };
};

const authSetAvatar = (avatar: File): AuthAction => {
  return {
    type: AuthActionTypes.SET_AVATAR,
    payload: avatar,
  };
};

const authSetAvatarSuccess = (user: User | null): AuthAction => {
  return {
    type: AuthActionTypes.SET_AVATAR_SUCCESS,
    payload: user,
  };
};

const authSetAvatarError = (error: AuthError): AuthAction => {
  return {
    type: AuthActionTypes.SET_AVATAR_ERROR,
    payload: error,
  };
};

const authSignOutRequest = (): AuthAction => {
  return {
    type: AuthActionTypes.SIGN_OUT_REQUEST,
  };
};

const authSignOutSuccess = (): AuthAction => {
  return {
    type: AuthActionTypes.SIGN_OUT_SUCCESS,
  };
};

const authSignOutError = (error: AuthError): AuthAction => {
  return {
    type: AuthActionTypes.SIGN_OUT_ERROR,
    payload: error,
  };
};

const authUpdateUserLikes = (changeLikes: {
  likes: string[];
  roomId: string;
}): AuthAction => {
  return {
    type: AuthActionTypes.UPDATE_USER_LIKES,
    payload: changeLikes,
  };
};

const authUpdateUserLikesSuccess = (user: User | null): AuthAction => {
  return {
    type: AuthActionTypes.UPDATE_USER_LIKES_SUCCESS,
    payload: user,
  };
};

const authSetLoginError = (error: AuthError): AuthAction => {
  return {
    type: AuthActionTypes.SET_LOGIN_ERROR,
    payload: error,
  };
};

const authUpdateUserLikesError = (error: AuthError): AuthAction => {
  return {
    type: AuthActionTypes.UPDATE_USER_LIKES_ERROR,
    payload: error,
  };
};

const authDeleteUser = (accountInfo: {
  email: string;
  password: string;
}): AuthAction => {
  return {
    type: AuthActionTypes.DELETE_USER,
    payload: accountInfo,
  };
};

const authDeleteUserSuccess = (user: null): AuthAction => {
  return {
    type: AuthActionTypes.DELETE_USER_SUCCESS,
    payload: user,
  };
};

const authDeleteUserError = (error: AuthError): AuthAction => {
  return {
    type: AuthActionTypes.DELETE_USER_ERROR,
    payload: error,
  };
};

const authUpdateUserPassword = (changePasswordInfo: {
  oldPassword: string;
  newPassword: string;
}): AuthAction => {
  return {
    type: AuthActionTypes.UPDATE_USER_PASSWORD,
    payload: changePasswordInfo,
  };
};

const authUpdateUserPasswordSuccess = (user: User): AuthAction => {
  return {
    type: AuthActionTypes.UPDATE_USER_PASSWORD_SUCCESS,
    payload: user,
  };
};

const authUpdateUserPasswordError = (error: AuthError): AuthAction => {
  return {
    type: AuthActionTypes.UPDATE_USER_PASSWORD_ERROR,
    payload: error,
  };
};

export {
  authSigninRequest,
  authSigninSuccess,
  authSigninError,
  authSignupRequest,
  authSignupSuccess,
  authSignupError,
  authUpdateUserState,
  authUpdateUserStateSuccess,
  authUpdateUserStateError,
  authSetLogin,
  authSetLoginSuccess,
  authSetLoginError,
  authUpdateUserPassword,
  authUpdateUserPasswordSuccess,
  authUpdateUserPasswordError,
  authDeleteUser,
  authDeleteUserSuccess,
  authDeleteUserError,
  authSignOutRequest,
  authSignOutSuccess,
  authSignOutError,
  authUpdateUserLikes,
  authUpdateUserLikesSuccess,
  authUpdateUserLikesError,
  authSetAvatar,
  authSetAvatarSuccess,
  authSetAvatarError,
};
