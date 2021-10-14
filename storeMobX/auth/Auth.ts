import { makeAutoObservable } from 'mobx';

import { Firebase } from '@/libs/Firebase';

import type { RootStoreType } from 'storeMobX/rootStoreType';
import type { AuthError, AuthType, User, UserInfo } from './authTypes';

class Auth implements AuthType {
  rootStore: RootStoreType;

  user: null | User = null;

  isUserLoading = false;

  userError: null | AuthError = null;

  constructor(rootStore: RootStoreType) {
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });

    this.rootStore = rootStore;
  }

  *signinRequest(authInfo: {
    email: string;
    password: string;
  }): Generator<unknown, void, User> {
    this.isUserLoading = true;
    this.user = null;
    this.userError = null;
    const firebaseApi = new Firebase();

    try {
      this.user = yield firebaseApi.signinRequest(authInfo);
    } catch (error) {
      this.user = null;
      this.userError = error;
    } finally {
      this.isUserLoading = false;
    }
  }

  *signupRequest(authInfo: {
    email: string;
    password: string;
    userInfo: UserInfo;
  }): Generator<unknown, void, User> {
    this.isUserLoading = true;
    this.user = null;
    this.userError = null;

    const firebaseApi = new Firebase();

    try {
      this.user = yield firebaseApi.singupRequest(authInfo);
    } catch (error) {
      this.user = null;
      this.userError = error;
    } finally {
      this.isUserLoading = false;
    }
  }

  *updateUserState(): Generator<unknown, void, User | null> {
    this.isUserLoading = true;
    this.user = null;
    this.userError = null;

    const firebaseApi = new Firebase();

    try {
      this.user = yield firebaseApi.updateUserState();
    } catch (error) {
      this.user = null;
      this.userError = error;
    } finally {
      this.isUserLoading = false;
    }
  }

  *setLogin(authInfo: {
    name: string;
    surname: string;
  }): Generator<unknown, void, User> {
    this.isUserLoading = true;
    this.user = null;
    this.userError = null;

    const firebaseApi = new Firebase();

    try {
      this.user = yield firebaseApi.setLogin(authInfo);
    } catch (error) {
      this.user = null;
      this.userError = error;
    } finally {
      this.isUserLoading = false;
    }
  }

  *deleteUser(authInfo: {
    email: string;
    password: string;
  }): Generator<unknown, void, null> {
    this.isUserLoading = true;
    this.user = null;
    this.userError = null;

    const firebaseApi = new Firebase();

    try {
      this.user = yield firebaseApi.deleteUser(authInfo);
    } catch (error) {
      this.user = null;
      this.userError = error;
    } finally {
      this.isUserLoading = false;
    }
  }

  *setAvatar(avatar: File): Generator<unknown, void, User> {
    this.isUserLoading = true;
    this.user = null;
    this.userError = null;

    const firebaseApi = new Firebase();

    try {
      this.user = yield firebaseApi.setAvatar(avatar);
    } catch (error) {
      this.user = null;
      this.userError = error;
    } finally {
      this.isUserLoading = false;
    }
  }

  *signOutRequest(): Generator<unknown, void, null> {
    this.isUserLoading = true;
    this.user = null;
    this.userError = null;

    const firebaseApi = new Firebase();

    try {
      this.user = yield firebaseApi.signOutRequest();
    } catch (error) {
      this.user = null;
      this.userError = error;
    } finally {
      this.isUserLoading = false;
    }
  }

  *updateUserLikesWorker({
    likes,
  }: {
    likes: string[];
  }): Generator<unknown, void, User> {
    this.isUserLoading = true;
    this.user = null;
    this.userError = null;

    const firebaseApi = new Firebase();

    try {
      this.user = yield firebaseApi.updateUserLikesWorker({ likes });
    } catch (error) {
      this.user = null;
      this.userError = error;
    } finally {
      this.isUserLoading = false;
    }
  }

  *updateUserPassword({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }): Generator<unknown, void, User> {
    this.isUserLoading = true;
    this.user = null;
    this.userError = null;

    const firebaseApi = new Firebase();

    try {
      this.user = yield firebaseApi.updateUserPassword({
        oldPassword,
        newPassword,
      });
    } catch (error) {
      this.user = null;
      this.userError = error;
    } finally {
      this.isUserLoading = false;
    }
  }
}

export { Auth };
