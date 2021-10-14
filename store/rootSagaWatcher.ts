import { all } from 'redux-saga/effects';

import { roomsWatcher } from './rooms/roomsSaga';
import { authWatcher } from './auth/authSaga';
import { bookingsWatcher } from './booking/bokingSaga';
import { roomWatcher } from './room/roomSaga';
import { subscriptionWatcher } from './subscription/subscriptionSaga';

export function* rootWatcher(): Generator {
  yield all([
    roomWatcher(),
    roomsWatcher(),
    authWatcher(),
    bookingsWatcher(),
    subscriptionWatcher(),
  ]);
}
