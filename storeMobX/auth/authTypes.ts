import firebase from 'firebase/app';

import { RootStoreType } from 'storeMobX/rootStoreType';

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
  firebaseUser: firebase.User;
};

type AuthError = firebase.auth.Error | firebase.firestore.Firestore | Error;

type Auth = {
  user: null | User;
  isUserLoading: boolean;
  userError: null | AuthError;
};

type AuthType = {
  rootStore: RootStoreType;

  user: null | User;

  isUserLoading: boolean;

  userError: null | AuthError;

  signinRequest(authInfo: {
    email: string;
    password: string;
  }): Generator<unknown, void, User>;

  signupRequest(authInfo: {
    email: string;
    password: string;
    userInfo: UserInfo;
  }): Generator<unknown, void, User>;

  updateUserState(): Generator<unknown, void, User | null>;

  setLogin(authInfo: {
    name: string;
    surname: string;
  }): Generator<unknown, void, User>;

  deleteUser(authInfo: {
    email: string;
    password: string;
  }): Generator<unknown, void, null>;

  setAvatar(avatar: File): Generator<unknown, void, User>;
  signOutRequest(): Generator<unknown, void, null>;

  updateUserLikesWorker({
    likes,
  }: {
    likes: string[];
  }): Generator<unknown, void, User>;

  updateUserPassword({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }): Generator<unknown, void, User>;
};

export type { User, AuthError, UserInfo, Auth, AuthType };
