import firebase from 'firebase/app';
import { put, takeEvery, select } from 'redux-saga/effects';

import { Firebase } from '@/libs/Firebase';

import type { AllRooms, RoomsFetchFilteredGenerator } from './roomsTypes';
import { RoomsActionTypes } from './roomsTypes';
import {
  roomsFetchFilteredError,
  roomsFetchFilteredSuccess,
} from './roomsActions';
import {
  isDatesMatch,
  isConveniencesMath,
  isGuestsMatch,
} from './utilities/filterRooms';

function* fetchFilteredRoomsWorker(): RoomsFetchFilteredGenerator {
  const firebaseApi = new Firebase();
  let filter = yield select((state) => state.rooms.filter);

  if (!filter) {
    filter = {};
  }
  if ('query' in filter) {
    throw new Error('filter is not of the type RoomsState["filter"]');
  }

  const {
    dates,
    priceRange,
    rules,
    availabilities,
    conveniences,
    features,
    guests,
  } = filter;

  try {
    const allRooms: AllRooms = {};

    // eslint-disable-next-line max-len
    let filteredRoomsQuery: firebase.firestore.Query<firebase.firestore.DocumentData> =
      firebaseApi.database.collection('rooms');
    if (priceRange) {
      filteredRoomsQuery = filteredRoomsQuery.where(
        'price',
        '>=',
        priceRange[0],
      );
      filteredRoomsQuery = filteredRoomsQuery.where(
        'price',
        '<=',
        priceRange[1],
      );
    }
    if (rules) {
      Object.entries(rules).forEach(([ruleName, ruleValue]) => {
        if (ruleValue) {
          filteredRoomsQuery = filteredRoomsQuery.where(
            `rules.${ruleName}`,
            '==',
            true,
          );
        }
      });
    }
    if (availabilities) {
      Object.entries(availabilities).forEach(
        ([availabilityName, availabilityValue]) => {
          if (availabilityValue) {
            filteredRoomsQuery = filteredRoomsQuery.where(
              `availabilities.${availabilityName}`,
              '==',
              true,
            );
          }
        },
      );
    }
    if (features) {
      Object.entries(features).forEach(([featureName, featureValue]) => {
        if (featureValue) {
          filteredRoomsQuery = filteredRoomsQuery.where(
            `features.${featureName}`,
            '==',
            true,
          );
        }
      });
    }

    const roomsSnapshot = yield filteredRoomsQuery
      .orderBy('price')
      .orderBy('number')
      .get();
    if (roomsSnapshot === null) {
      throw new Error('roomsSnapshot is null');
    }
    if (!('query' in roomsSnapshot)) {
      throw new Error('roomsSnapshot is not of the type QuerySnapshot');
    }

    roomsSnapshot.forEach((roomDocument) => {
      const room = roomDocument.data();

      // Фильтрация по значениям, которые нельзя отфильтровать на firebase
      let isMatch = true;
      if (dates) {
        isMatch = isMatch && isDatesMatch(room.bookings, dates);
      }
      if (conveniences) {
        isMatch =
          isMatch && isConveniencesMath(room.conveniences, conveniences);
      }
      if (guests) {
        isMatch = isMatch && isGuestsMatch(room.guests, guests);
      }

      if (isMatch) {
        allRooms[roomDocument.id] = room;
      }
    });

    yield put(roomsFetchFilteredSuccess(allRooms));
  } catch (error) {
    yield put(roomsFetchFilteredError(error));
  }
}

export function* roomsWatcher(): Generator {
  yield takeEvery(
    RoomsActionTypes.FETCH_FILTERED_ROOMS,
    fetchFilteredRoomsWorker,
  );
}
