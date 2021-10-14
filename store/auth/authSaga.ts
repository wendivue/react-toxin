import firebase from 'firebase/app';
import { put, takeEvery, select, all, call } from 'redux-saga/effects';

import { Firebase } from '@/libs/Firebase';
import { roomFetchSuccess, roomGetReviewsSuccess } from 'store/room/roomAction';
import { Room, RoomReview } from 'store/rooms/roomsTypes';

import {
  authUpdateUserStateError,
  authUpdateUserStateSuccess,
  authSigninError,
  authSigninSuccess,
  authSignupError,
  authSignupSuccess,
  authSetLoginSuccess,
  authSetLoginError,
  authDeleteUserError,
  authDeleteUserSuccess,
  authSignOutSuccess,
  authSignOutError,
  authUpdateUserLikesSuccess,
  authUpdateUserLikesError,
  authUpdateUserPasswordSuccess,
  authUpdateUserPasswordError,
} from './authActions';
import type {
  AuthSetLoginEffect,
  AuthSetLoginGenerator,
  AuthDeleteUserEffect,
  AuthDeleteUserGenerator,
  AuthSigninRequestEffect,
  AuthSigninRequestGenerator,
  AuthSignOutRequestGenerator,
  AuthSignupRequestEffect,
  AuthSignupRequestGenerator,
  AuthUpdateUserLikesEffect,
  AuthUpdateUserLikesGenerator,
  AuthUpdateUserPasswordEffect,
  AuthUpdateUserPasswordGenerator,
  AuthUpdateUserStateGenerator,
  AuthSetAvatarEffect,
  AuthSetAvatarGenerator,
} from './authTypes';
import { AuthActionTypes, UserInfo } from './authTypes';

function* signinRequestWorker({
  payload: { email, password },
}: AuthSigninRequestEffect): AuthSigninRequestGenerator {
  const firebaseApi = new Firebase();
  try {
    yield firebaseApi.auth.signInWithEmailAndPassword(email, password);
    if (!firebaseApi.auth.currentUser) {
      throw new Error('firebaseApi.auth.currentUser is null');
    }

    const userDocument = yield firebaseApi.database
      .collection('users')
      .doc(firebaseApi.auth.currentUser.uid)
      .get();
    if (typeof userDocument !== 'object') {
      throw new Error('userDocument is not an object');
    }
    const userInfo = userDocument.data();
    if (userInfo) {
      yield put(
        authSigninSuccess({
          userInfo,
          firebaseUser: firebaseApi.auth.currentUser,
        }),
      );
    } else {
      throw new Error('user info not found');
    }
  } catch (error) {
    yield put(authSigninError(error));
  }
}

function* signupRequestWorker({
  payload: { email, password, userInfo },
}: AuthSignupRequestEffect): AuthSignupRequestGenerator {
  const firebaseApi = new Firebase();
  try {
    yield firebaseApi.auth.signOut();

    yield firebaseApi.auth.createUserWithEmailAndPassword(email, password);
    if (!firebaseApi.auth.currentUser) {
      throw new Error('userCredential.user is null');
    }

    yield firebaseApi.database
      .collection('users')
      .doc(firebaseApi.auth.currentUser.uid)
      .set(userInfo);

    yield put(
      authSignupSuccess({
        userInfo,
        firebaseUser: firebaseApi.auth.currentUser,
      }),
    );
  } catch (error) {
    yield firebaseApi.auth.currentUser?.delete();
    yield put(authSignupError(error));
  }
}

function* updateUserStateWorker(): AuthUpdateUserStateGenerator {
  const firebaseApi = new Firebase();

  try {
    const user = yield firebaseApi.getCurrentUser();
    if (!user) {
      yield put(authUpdateUserStateSuccess(null));
      return;
    }
    if (!('uid' in user)) {
      throw new Error('uid is not in user');
    }

    const userDocument = yield firebaseApi.database
      .collection('users')
      .doc(user.uid)
      .get();
    if (!userDocument) {
      throw new Error('userDocument is null');
    }
    if (!('data' in userDocument)) {
      throw new Error('userDocument is not an object');
    }
    const userInfo = userDocument.data();
    if (!userInfo) {
      throw new Error('userInfo is undefined');
    }
    yield put(
      authUpdateUserStateSuccess({
        firebaseUser: user,
        userInfo,
      }),
    );
  } catch (error) {
    yield put(authUpdateUserStateError(error));
  }
}

function* setLoginWorker({
  payload: { name, surname },
}: AuthSetLoginEffect): AuthSetLoginGenerator {
  const firebaseApi = new Firebase();

  try {
    if (!firebaseApi.auth.currentUser) {
      throw new Error('firebaseApi.auth.currentUser is null');
    }

    const userDocument = yield firebaseApi.database
      .collection('users')
      .doc(firebaseApi.auth.currentUser.uid)
      .get();

    if (typeof userDocument !== 'object') {
      throw new Error('userDocument is not an object');
    }

    const userInfo = userDocument.data();

    if (userInfo) {
      userInfo.name = name;
      userInfo.surname = surname;

      yield firebaseApi.database
        .collection('users')
        .doc(firebaseApi.auth.currentUser.uid)
        .set(userInfo);

      yield put(
        authSetLoginSuccess({
          userInfo,
          firebaseUser: firebaseApi.auth.currentUser,
        }),
      );
    } else {
      throw new Error('user info not found');
    }
  } catch (error) {
    yield put(authSetLoginError(error));
  }
}

function* setAvatarWorker({
  payload: avatar,
}: AuthSetAvatarEffect): AuthSetAvatarGenerator {
  const firebaseApi = new Firebase();

  try {
    if (!firebaseApi.auth.currentUser) {
      throw new Error('firebaseApi.auth.currentUser is null');
    }

    const userDocument = yield firebaseApi.database
      .collection('users')
      .doc(firebaseApi.auth.currentUser.uid)
      .get();

    const storageRef = firebaseApi.storage.ref(
      `${firebaseApi.auth.currentUser.uid}/img/avatar.jpg`,
    );

    if (typeof userDocument !== 'object') {
      throw new Error('userDocument is not an object');
    }

    storageRef.put(avatar);
    yield storageRef.getDownloadURL();

    const userInfo = userDocument.data();

    if (userInfo) {
      const downloadUrl = yield storageRef.getDownloadURL();
      userInfo.avatar = downloadUrl.toString();

      yield firebaseApi.database
        .collection('users')
        .doc(firebaseApi.auth.currentUser.uid)
        .set(userInfo);

      yield put(
        authSetLoginSuccess({
          userInfo,
          firebaseUser: firebaseApi.auth.currentUser,
        }),
      );
    } else {
      throw new Error('user info not found');
    }
  } catch (error) {
    yield put(authSetLoginError(error));
  }
}

function* signOutRequestWorker(): AuthSignOutRequestGenerator {
  const firebaseApi = new Firebase();
  try {
    yield firebaseApi.auth.signOut();

    yield put(authSignOutSuccess());
  } catch (error) {
    yield put(authSignOutError(error));
  }
}

function* updateUserLikesWorker({
  payload: { likes, roomId },
}: AuthUpdateUserLikesEffect): AuthUpdateUserLikesGenerator {
  const firebaseApi = new Firebase();

  try {
    let room = yield select((state) => state.room.room);
    let reviews = yield select((state) => state.room.reviews);
    room = room as Room | null;
    reviews = reviews as RoomReview | null;

    if (!firebaseApi.auth.currentUser) {
      throw new Error('firebaseApi.auth.currentUser is null');
    }

    const userDocument = yield firebaseApi.database
      .collection('users')
      .doc(firebaseApi.auth.currentUser.uid)
      .get();

    if (typeof userDocument !== 'object') {
      throw new Error('userDocument is not an object');
    }

    const userInfo = (
      userDocument as firebase.firestore.DocumentSnapshot<UserInfo>
    ).data();

    if (userInfo) {
      const addedLikes: Array<string> = [];
      const removedLikes: Array<string> = [];

      likes
        .filter((like) => userInfo.reviewLikes?.indexOf(like) === -1)
        .forEach((addedLike) => addedLikes.push(addedLike));
      userInfo.reviewLikes
        ?.filter((like) => likes.indexOf(like) === -1)
        .forEach((removedLike) => removedLikes.push(removedLike));

      const updatedReviews = { ...reviews };

      addedLikes.forEach((reviewId) => {
        updatedReviews[reviewId] = {
          ...updatedReviews[reviewId],
          likes: (updatedReviews[reviewId].likes || 0) + 1,
        };
      });
      removedLikes.forEach((reviewId) => {
        room = room as Room | null;
        updatedReviews[reviewId] = {
          ...updatedReviews[reviewId],
          likes: (updatedReviews[reviewId].likes || 0) - 1,
        };
      });

      const changeLikesInRoom = async (): Promise<void> => {
        room = room as Room | null;
        await firebaseApi.database
          .collection('rooms')
          .doc(roomId)
          .set({
            ...room,
            reviews: updatedReviews,
          });
      };

      const changeLikesInUser = async (): Promise<void> => {
        userInfo.reviewLikes = likes;
        await firebaseApi.database
          .collection('users')
          .doc(firebaseApi.auth.currentUser?.uid)
          .set(userInfo);
      };

      if (room) {
        yield put(
          authUpdateUserStateSuccess({
            userInfo,
            firebaseUser: firebaseApi.auth.currentUser,
          }),
        );
        yield put(
          roomFetchSuccess({
            ...room,
            reviews: updatedReviews,
          }),
        );
        yield put(roomGetReviewsSuccess(updatedReviews));
      }
      yield all([call(changeLikesInRoom), call(changeLikesInUser)]);
      yield put(
        authUpdateUserLikesSuccess({
          userInfo,
          firebaseUser: firebaseApi.auth.currentUser,
        }),
      );
    } else {
      throw new Error('user info not found');
    }
  } catch (error) {
    yield put(authUpdateUserLikesError(error));
  }
}

function* deleteUserWorker({
  payload: { email, password },
}: AuthDeleteUserEffect): AuthDeleteUserGenerator {
  const firebaseApi = new Firebase();

  try {
    if (!firebaseApi.auth.currentUser) {
      throw new Error('firebaseApi.auth.currentUser is null');
    }

    const emailCred = firebase.auth.EmailAuthProvider.credential(
      email,
      password,
    );

    yield firebaseApi.app
      .auth()
      .currentUser?.reauthenticateWithCredential(emailCred);
    yield firebaseApi.database
      .collection('users')
      .doc(firebaseApi.auth.currentUser.uid)
      .delete();
    yield firebaseApi.auth.currentUser.delete();
    yield put(authDeleteUserSuccess(null));
  } catch (error) {
    yield put(authDeleteUserError(error));
  }
}

function* updateUserPasswordWorker({
  payload: { oldPassword, newPassword },
}: AuthUpdateUserPasswordEffect): AuthUpdateUserPasswordGenerator {
  const firebaseApi = new Firebase();

  try {
    const user = yield firebaseApi.getCurrentUser();
    if (!user) {
      throw new Error('user is null');
    }
    if (typeof user !== 'object') {
      throw new Error('user is null');
    }
    if (!('email' in user)) {
      throw new Error('user has not email field');
    }
    const userEmail = user.email;

    if (!userEmail) {
      throw new Error('firebaseApi.auth.currentUser.email is null');
    }

    if (!firebaseApi.auth.currentUser) {
      throw new Error('firebaseApi.auth.currentUser is null');
    }

    const emailCred = firebase.auth.EmailAuthProvider.credential(
      userEmail,
      oldPassword,
    );

    yield firebaseApi.app
      .auth()
      .currentUser?.reauthenticateWithCredential(emailCred);

    const userDocument = yield firebaseApi.database
      .collection('users')
      .doc(firebaseApi.auth.currentUser.uid)
      .get();

    if (!userDocument) {
      throw new Error('userDocument is null');
    }

    if (typeof userDocument !== 'object') {
      throw new Error('userDocument is not an object');
    }

    if ('email' in userDocument) {
      throw new Error('userDocument is not of type Document');
    }

    const userInfo = userDocument.data();
    if (userInfo) {
      yield firebaseApi.auth.currentUser.updatePassword(newPassword);
      yield put(
        authUpdateUserPasswordSuccess({
          userInfo,
          firebaseUser: firebaseApi.auth.currentUser,
        }),
      );
    } else {
      throw new Error('user info not found');
    }
  } catch (error) {
    yield put(authUpdateUserPasswordError(error));
  }
}

export function* authWatcher(): Generator {
  yield takeEvery(AuthActionTypes.SIGNIN_REQUEST, signinRequestWorker);
  yield takeEvery(AuthActionTypes.SIGNUP_REQUEST, signupRequestWorker);
  yield takeEvery(AuthActionTypes.UPDATE_USER_STATE, updateUserStateWorker);
  yield takeEvery(AuthActionTypes.SET_LOGIN, setLoginWorker);
  yield takeEvery(AuthActionTypes.SET_AVATAR, setAvatarWorker);
  yield takeEvery(AuthActionTypes.DELETE_USER, deleteUserWorker);
  yield takeEvery(AuthActionTypes.SIGN_OUT_REQUEST, signOutRequestWorker);
  yield takeEvery(AuthActionTypes.UPDATE_USER_LIKES, updateUserLikesWorker);
  yield takeEvery(
    AuthActionTypes.UPDATE_USER_PASSWORD,
    updateUserPasswordWorker,
  );
}
