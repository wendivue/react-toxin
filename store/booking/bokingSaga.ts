import firebase from 'firebase/app';
import { put, takeEvery } from 'redux-saga/effects';

import { Firebase } from '@/libs/Firebase';

import { Room } from '../rooms/roomsTypes';
import { BookingActionTypes } from './bookingTypes';
import type {
  BookingAddGenerator,
  BookingAddAction,
  Bookings,
  BookingDeleteAction,
  BookingDeleteGenerator,
} from './bookingTypes';
import {
  bookingAddError,
  bookingAddSuccess,
  bookingDeleteError,
  bookingDeleteSuccess,
  bookingFetchError,
  bookingFetchSuccess,
} from './bookingActions';
import { hash } from './helper';

function* setBookingsWorker({
  payload: booking,
}: BookingAddAction): BookingAddGenerator {
  const firebaseApi = new Firebase();
  try {
    let user = yield firebaseApi.getCurrentUser();
    if (!user) {
      throw new Error('userCredential.user is null');
    }
    if (!('uid' in user)) {
      throw new Error('user.uid is undefined');
    }

    user = user as firebase.User;

    let bookingsOld = yield firebaseApi.database
      .collection('bookings')
      .doc(user.uid)
      .get()
      .then((dataOld) => dataOld.data());

    bookingsOld = <Bookings>bookingsOld || {};

    let roomOld = yield firebaseApi.database
      .collection('rooms')
      .doc(booking.roomId)
      .get()
      .then((dataOld) => dataOld.data());
    roomOld = (roomOld as Room) || {};

    if (typeof roomOld.bookings === 'undefined') {
      roomOld.bookings = {};
    }

    const bookingId = hash(user.uid);

    yield firebaseApi.database
      .collection('bookings')
      .doc(user.uid)
      .set({ ...bookingsOld, [bookingId]: booking });

    yield firebaseApi.database
      .collection('rooms')
      .doc(booking.roomId)
      .update({
        bookings: {
          ...roomOld.bookings,
          [user.uid]: {
            ...roomOld.bookings[user.uid],
            [bookingId]: {
              dateFrom: booking.dates.dateFrom,
              dateTo: booking.dates.dateTo,
            },
          },
        },
      });

    yield put(bookingAddSuccess({ ...bookingsOld, [bookingId]: booking }));
  } catch (error) {
    yield put(bookingAddError(error));
  }
}
function* getBookingsWorker(): BookingAddGenerator {
  const firebaseApi = new Firebase();
  try {
    let user = yield firebaseApi.getCurrentUser();

    if (!user) {
      throw new Error('userCredential.user is null');
    }
    user = user as firebase.User;

    let bookingsOld = yield firebaseApi.database
      .collection('bookings')
      .doc(user.uid)
      .get()
      .then((dataOld) => dataOld.data());

    bookingsOld = <Bookings>bookingsOld || {};

    yield put(bookingFetchSuccess({ ...bookingsOld }));
  } catch (error) {
    yield put(bookingFetchError(error));
  }
}

function* deleteBookingWorker({
  payload: [bookingId, roomId],
}: BookingDeleteAction): BookingDeleteGenerator {
  const firebaseApi = new Firebase();
  try {
    let user = yield firebaseApi.getCurrentUser();

    if (!user) {
      throw new Error('userCredential.user is null');
    }
    user = user as firebase.User;

    let bookingsOld = yield firebaseApi.database
      .collection('bookings')
      .doc(user.uid)
      .get()
      .then((dataOld) => dataOld.data());
    bookingsOld = <Bookings>bookingsOld;

    const { [bookingId]: _, ...bookingNew } = bookingsOld;

    yield firebaseApi.database
      .collection('bookings')
      .doc(user.uid)
      .set({ ...bookingNew });

    let roomOld = yield firebaseApi.database
      .collection('rooms')
      .doc(roomId)
      .get()
      .then((dataOld) => dataOld.data());
    roomOld = (roomOld as Room) || {};

    if (typeof roomOld.bookings === 'undefined') {
      roomOld.bookings = {};
    }
    const { [bookingId]: __, ...roomNew } = roomOld.bookings[user.uid];
    yield firebaseApi.database
      .collection('rooms')
      .doc(roomId)
      .update({
        bookings: {
          ...roomOld.bookings,
          [user.uid]: {
            ...roomNew,
          },
        },
      });

    yield put(bookingDeleteSuccess({ ...bookingNew }));
  } catch (error) {
    yield put(bookingDeleteError(error));
  }
}

export function* bookingsWatcher(): Generator {
  yield takeEvery(BookingActionTypes.ADD_BOOKING, setBookingsWorker);
  yield takeEvery(BookingActionTypes.FETCH_BOOKING, getBookingsWorker);
  yield takeEvery(BookingActionTypes.DELETE_BOOKING, deleteBookingWorker);
}
