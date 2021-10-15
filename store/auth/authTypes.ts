import {
  Effect,
  PutEffect,
  SelectEffect,
  AllEffect,
  CallEffect,
} from 'redux-saga/effects';
import firebase from 'firebase/app';

import { Room, RoomReview } from '../rooms/roomsTypes';

enum AuthActionTypes {
  SIGNIN_REQUEST = 'SIGNIN_REQUEST',
  SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
  SIGNIN_ERROR = 'SIGNIN_ERROR',
  SIGNUP_REQUEST = 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_ERROR = 'SIGNUP_ERROR',
  SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST',
  SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
  SIGN_OUT_ERROR = 'SIGN_OUT_ERROR',
  UPDATE_USER_STATE = 'UPDATE_USER_STATE',
  UPDATE_USER_STATE_SUCCESS = 'UPDATE_USER_STATE_SUCCESS',
  UPDATE_USER_STATE_ERROR = 'UPDATE_USER_STATE_ERROR',
  SET_LOGIN = 'SET_LOGIN',
  SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS',
  SET_LOGIN_ERROR = 'SET_LOGIN_ERROR',
  SET_AVATAR = 'SET_AVATAR',
  SET_AVATAR_SUCCESS = 'SET_AVATAR_SUCCESS',
  SET_AVATAR_ERROR = 'SET_AVATAR_ERROR',
  DELETE_USER = 'DELETE_USER',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
  DELETE_USER_ERROR = 'DELETE_USER_ERROR',
  UPDATE_USER_LIKES = ' UPDATE_USER_LIKES',
  UPDATE_USER_LIKES_SUCCESS = ' UPDATE_USER_LIKES_SUCCESS',
  UPDATE_USER_LIKES_ERROR = ' UPDATE_USER_LIKES_ERROR',
  UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD',
  UPDATE_USER_PASSWORD_SUCCESS = 'UPDATE_USER_PASSWORD_SUCCESS',
  UPDATE_USER_PASSWORD_ERROR = 'UPDATE_USER_PASSWORD_ERROR',
}

type UserInfo = {
  name: string;
  surname: string;
  gender: 0 | 1;
  birthday: string;
  isSubscribed: boolean;
  avatar?: string | null;
  ratings?: Record<string, 0 | 1 | 2 | 3 | 4>;
  reviewLikes?: Array<string>;
};

type User = {
  userInfo: UserInfo;
  firebaseUser: firebase.User | { uid: string };
};

type AuthError = firebase.auth.Error | firebase.firestore.Firestore | Error;

type AuthState = {
  user: null | User;
  isUserLoading: boolean;
  userError: null | AuthError;
};

type AuthSigninRequestAction = {
  type: AuthActionTypes.SIGNIN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
};

type AuthSigninSuccessAction = {
  type: AuthActionTypes.SIGNIN_SUCCESS;
  payload: User;
};

type AuthSigninErrorAction = {
  type: AuthActionTypes.SIGNIN_ERROR;
  payload: AuthError;
};

type AuthSignupRequestAction = {
  type: AuthActionTypes.SIGNUP_REQUEST;
  payload: {
    email: string;
    password: string;
    userInfo: UserInfo;
  };
};

type AuthSignupSuccessAction = {
  type: AuthActionTypes.SIGNUP_SUCCESS;
  payload: User;
};

type AuthSignupErrorAction = {
  type: AuthActionTypes.SIGNUP_ERROR;
  payload: AuthError;
};

type AuthUpdateUserStateAction = {
  type: AuthActionTypes.UPDATE_USER_STATE;
};

type AuthUpdateUserStateSuccessAction = {
  type: AuthActionTypes.UPDATE_USER_STATE_SUCCESS;
  payload: User | null;
};

type AuthUpdateUserStateErrorAction = {
  type: AuthActionTypes.UPDATE_USER_STATE_ERROR;
  payload: AuthError;
};

type AuthSetLoginAction = {
  type: AuthActionTypes.SET_LOGIN;
  payload: {
    name: string;
    surname: string;
  };
};

type AuthSetLoginSuccessAction = {
  type: AuthActionTypes.SET_LOGIN_SUCCESS;
  payload: User | null;
};

type AuthSetLoginErrorAction = {
  type: AuthActionTypes.SET_LOGIN_ERROR;
  payload: AuthError;
};

type AuthSetAvatarAction = {
  type: AuthActionTypes.SET_AVATAR;
  payload: File;
};

type AuthSetAvatarSuccessAction = {
  type: AuthActionTypes.SET_AVATAR_SUCCESS;
  payload: User | null;
};

type AuthSetAvatarErrorAction = {
  type: AuthActionTypes.SET_AVATAR_ERROR;
  payload: AuthError;
};

type AuthSignOutRequestAction = {
  type: AuthActionTypes.SIGN_OUT_REQUEST;
};

type AuthSignOutSuccessAction = {
  type: AuthActionTypes.SIGN_OUT_SUCCESS;
};

type AuthSignOutErrorAction = {
  type: AuthActionTypes.SIGN_OUT_ERROR;
  payload: AuthError;
};

type AuthUpdateUserLikesAction = {
  type: AuthActionTypes.UPDATE_USER_LIKES;
  payload: {
    likes: string[];
    roomId: string;
  };
};

type AuthUpdateUserLikesSuccessAction = {
  type: AuthActionTypes.UPDATE_USER_LIKES_SUCCESS;
  payload: User | null;
};

type AuthUpdateUserLikesErrorAction = {
  type: AuthActionTypes.UPDATE_USER_LIKES_ERROR;
  payload: AuthError;
};

type AuthDeleteUserAction = {
  type: AuthActionTypes.DELETE_USER;
  payload: {
    email: string;
    password: string;
  };
};

type AuthDeleteUserSuccessAction = {
  type: AuthActionTypes.DELETE_USER_SUCCESS;
  payload: null;
};

type AuthDeleteUserErrorAction = {
  type: AuthActionTypes.DELETE_USER_ERROR;
  payload: AuthError;
};

type AuthUpdateUserPasswordAction = {
  type: AuthActionTypes.UPDATE_USER_PASSWORD;
  payload: {
    oldPassword: string;
    newPassword: string;
  };
};

type AuthUpdateUserPasswordSuccessAction = {
  type: AuthActionTypes.UPDATE_USER_PASSWORD_SUCCESS;
  payload: User | null;
};

type AuthUpdateUserPasswordErrorAction = {
  type: AuthActionTypes.UPDATE_USER_PASSWORD_ERROR;
  payload: AuthError;
};

type AuthAction =
  | AuthSigninRequestAction
  | AuthSigninSuccessAction
  | AuthSigninErrorAction
  | AuthSignupRequestAction
  | AuthSignupSuccessAction
  | AuthSignupErrorAction
  | AuthUpdateUserStateAction
  | AuthUpdateUserStateSuccessAction
  | AuthUpdateUserStateErrorAction
  | AuthSetLoginAction
  | AuthSetLoginSuccessAction
  | AuthSetLoginErrorAction
  | AuthSetAvatarAction
  | AuthSetAvatarSuccessAction
  | AuthSetAvatarErrorAction
  | AuthSignOutRequestAction
  | AuthSignOutSuccessAction
  | AuthSignOutErrorAction
  | AuthUpdateUserLikesAction
  | AuthUpdateUserLikesSuccessAction
  | AuthUpdateUserLikesErrorAction
  | AuthUpdateUserPasswordAction
  | AuthUpdateUserPasswordSuccessAction
  | AuthUpdateUserPasswordErrorAction
  | AuthDeleteUserAction
  | AuthDeleteUserSuccessAction
  | AuthDeleteUserErrorAction;

type AuthSigninRequestEffect = Effect<
  AuthSigninRequestAction['type'],
  AuthSigninRequestAction['payload']
>;

type AuthSigninRequestGenerator = Generator<
  | Promise<
      | firebase.auth.UserCredential
      | string
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    >
  | PutEffect
  | undefined,
  void,
  string | firebase.firestore.DocumentSnapshot<UserInfo>
>;

type AuthSignupRequestEffect = Effect<
  AuthSignupRequestAction['type'],
  AuthSignupRequestAction['payload']
>;

type AuthSetLoginEffect = Effect<
  AuthSetLoginAction['type'],
  AuthSetLoginAction['payload']
>;

type AuthSetAvatarEffect = Effect<
  AuthSetAvatarAction['type'],
  AuthSetAvatarAction['payload']
>;

type AuthSignupRequestGenerator = Generator<
  Promise<firebase.auth.UserCredential | void | string> | PutEffect | undefined,
  void,
  firebase.auth.UserCredential | string
>;

type AuthUpdateUserStateGenerator = Generator<
  | Promise<
      firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    >
  | PutEffect
  | Promise<firebase.User | null>,
  void,
  firebase.User | null | firebase.firestore.DocumentSnapshot<UserInfo>
>;

type AuthSetLoginGenerator = Generator<
  | Promise<
      | void
      | string
      | firebase.auth.UserCredential
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    >
  | PutEffect
  | undefined,
  void,
  string | firebase.firestore.DocumentSnapshot<UserInfo>
>;

type AuthSetAvatarGenerator = Generator<
  | Promise<
      | void
      | string
      | firebase.auth.UserCredential
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    >
  | PutEffect
  | undefined,
  void,
  string | firebase.firestore.DocumentSnapshot<UserInfo>
>;

type AuthSignOutRequestGenerator = Generator<
  | Promise<
      | void
      | string
      | firebase.auth.UserCredential
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    >
  | PutEffect
  | undefined,
  void,
  string | firebase.firestore.DocumentSnapshot<UserInfo>
>;

type AuthUpdateUserLikesEffect = Effect<
  AuthUpdateUserLikesAction['type'],
  AuthUpdateUserLikesAction['payload']
>;

type AuthUpdateUserLikesGenerator = Generator<
  | Promise<
      | void
      | string
      | firebase.auth.UserCredential
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    >
  | PutEffect
  | SelectEffect
  | AllEffect<CallEffect>
  | undefined,
  void,
  | string
  | firebase.firestore.DocumentSnapshot<UserInfo>
  | Room
  | null
  | RoomReview
>;

type AuthDeleteUserEffect = Effect<
  AuthSigninRequestAction['type'],
  AuthSigninRequestAction['payload']
>;

type AuthDeleteUserGenerator = Generator<
  Promise<void | firebase.auth.UserCredential> | PutEffect | undefined
>;

type AuthUpdateUserPasswordEffect = Effect<
  AuthUpdateUserPasswordAction['type'],
  AuthUpdateUserPasswordAction['payload']
>;

type AuthUpdateUserPasswordGenerator = Generator<
  | Promise<
      | void
      | string
      | firebase.auth.UserCredential
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
      | firebase.User
      | null
    >
  | PutEffect
  | undefined,
  void,
  string | firebase.firestore.DocumentSnapshot<UserInfo> | firebase.User | null
>;

export type {
  User,
  UserInfo,
  AuthSigninRequestEffect,
  AuthSigninRequestGenerator,
  AuthSignupRequestEffect,
  AuthSignupRequestGenerator,
  AuthError,
  AuthState,
  AuthAction,
  AuthUpdateUserStateGenerator,
  AuthSetLoginEffect,
  AuthSetLoginGenerator,
  AuthDeleteUserEffect,
  AuthDeleteUserGenerator,
  AuthSignOutRequestGenerator,
  AuthUpdateUserLikesEffect,
  AuthUpdateUserLikesGenerator,
  AuthUpdateUserPasswordEffect,
  AuthUpdateUserPasswordGenerator,
  AuthSetAvatarEffect,
  AuthSetAvatarGenerator,
};

export { AuthActionTypes };
