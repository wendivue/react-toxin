import { put, takeEvery } from 'redux-saga/effects';

import { Firebase } from '@/libs/Firebase';

import type { SubscribeRequestEffect } from './subscriptionTypes';
import { subscribeError, subscribeSuccess } from './subscriptionActions';
import { SubscriptionActionTypes } from './subscriptionTypes';

function* subscribeRequestWorker({
  payload: email,
}: SubscribeRequestEffect): Generator {
  const firebaseApi = new Firebase();
  try {
    yield firebaseApi.subscribeEmail(email);
    yield put(subscribeSuccess(email));
  } catch (error) {
    yield put(subscribeError(error));
  }
}

function* subscriptionWatcher(): Generator {
  yield takeEvery(
    SubscriptionActionTypes.SUBSCRIBE_REQUEST,
    subscribeRequestWorker,
  );
}

export { subscriptionWatcher };
