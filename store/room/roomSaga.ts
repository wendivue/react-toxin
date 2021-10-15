import { put, takeEvery } from 'redux-saga/effects';

import { hash } from 'store/booking/helper';
import { RoomReview } from 'store/rooms/roomsTypes';
import { Firebase } from '@/libs/Firebase';

import {
  RoomAddReviewAction,
  RoomAddReviewGenerator,
  RoomChangeReviewAction,
  RoomChangeReviewGenerator,
  RoomDeleteReviewAction,
  RoomDeleteReviewGenerator,
  RoomBookingDataAction,
  RoomFetchDataAction,
  RoomFetchGenerator,
  RoomTypes,
  RoomGetReviewsAction,
  RoomGetReviewGenerator,
} from './roomTypes';
import {
  roomAddReviewError,
  roomAddReviewSuccess,
  roomChangeReviewError,
  roomChangeReviewSuccess,
  roomDeleteReviewError,
  roomDeleteReviewSuccess,
  roomBookingError,
  roomBookingSuccess,
  roomFetchError,
  roomFetchSuccess,
  roomGetReviewsError,
  roomGetReviewsSuccess,
} from './roomAction';

function* getRoomWorker({
  payload: roomId,
}: RoomFetchDataAction): RoomFetchGenerator {
  const firebaseApi = new Firebase();
  try {
    let roomDocument;
    yield firebaseApi.database
      .collection('rooms')
      .doc(roomId)
      .get()
      .then((doc) => {
        roomDocument = doc.data();
      });
    if (!roomDocument) {
      throw new Error('roomData is null');
    }

    yield put(roomFetchSuccess(roomDocument));
  } catch (error) {
    yield put(roomFetchError(error));
  }
}

function* setReviewWorker({
  payload: { roomId, text, date },
}: RoomAddReviewAction): RoomAddReviewGenerator {
  const firebaseApi = new Firebase();
  try {
    const roomDocument = yield firebaseApi.database
      .collection('rooms')
      .doc(roomId)
      .get();

    if (!roomDocument) {
      throw new Error('roomData is null');
    }

    const roomInfo = roomDocument.data();

    const user = yield firebaseApi.getCurrentUser();

    if (!user) {
      throw new Error('user is null');
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

    const userInfo = userDocument.data();

    if (roomInfo && userInfo) {
      let oldReview = roomInfo.reviews;

      if (typeof oldReview === 'undefined') {
        oldReview = {};
      }
      const reviewId = hash(user.uid);

      const avatar = userInfo.avatar ? userInfo.avatar : null;
      const newReviews = {
        ...oldReview,
        [reviewId]: {
          name: `${userInfo.name} ${userInfo.surname}`,
          img: avatar,
          userId: user.uid,
          text,
          date,
          likes: 0,
        },
      };

      yield firebaseApi.database
        .collection('rooms')
        .doc(roomId)
        .update({
          numberOfReviews: roomInfo.numberOfReviews + 1,
          reviews: newReviews,
        });

      yield put(roomAddReviewSuccess(newReviews));
    }
  } catch (error) {
    yield put(roomAddReviewError(error));
  }
}

function* deleteReviewWorker({
  payload: { roomId, reviewId },
}: RoomDeleteReviewAction): RoomDeleteReviewGenerator {
  const firebaseApi = new Firebase();
  try {
    const roomDocument = yield firebaseApi.database
      .collection('rooms')
      .doc(roomId)
      .get();

    if (!roomDocument) {
      throw new Error('roomData is null');
    }

    const roomInfo = roomDocument.data();

    if (roomInfo) {
      const oldReview = roomInfo.reviews as RoomReview;
      if (typeof oldReview === 'undefined') {
        throw new Error('reviews is undefined');
      }

      if (!(reviewId in oldReview)) {
        throw new Error('reviews does not contain such a reviewId');
      } else {
        delete oldReview[reviewId];
        const newReviews = {
          ...oldReview,
        };
        yield firebaseApi.database
          .collection('rooms')
          .doc(roomId)
          .update({
            numberOfReviews: roomInfo.numberOfReviews - 1,
            reviews: newReviews,
          });
        yield put(roomDeleteReviewSuccess(newReviews));
      }
    }
  } catch (error) {
    yield put(roomDeleteReviewError(error));
  }
}

function* changeReviewWorker({
  payload: { roomId, reviewId, likes, text },
}: RoomChangeReviewAction): RoomChangeReviewGenerator {
  const firebaseApi = new Firebase();
  try {
    if (!likes && !text) {
      throw new Error('text and likes is undefined');
    }

    const roomDocument = yield firebaseApi.database
      .collection('rooms')
      .doc(roomId)
      .get();

    if (!roomDocument) {
      throw new Error('roomData is null');
    }

    const roomInfo = roomDocument.data();

    if (roomInfo) {
      let oldReview = roomInfo.reviews;
      let changedParams = {};
      if (typeof oldReview === 'undefined') {
        oldReview = {};
      }

      const currentReview = Object.entries(roomInfo.reviews).filter(
        (item) => item[0] === reviewId && item,
      );
      const reviewObj = currentReview[0][1] as RoomReview;

      if (likes) {
        changedParams = { likes };
      }

      if (text) {
        changedParams = { ...changedParams, text };
      }

      const newReviews = {
        ...oldReview,
        [reviewId]: { ...reviewObj, ...changedParams },
      };

      yield firebaseApi.database.collection('rooms').doc(roomId).update({
        reviews: newReviews,
      });
      yield put(roomChangeReviewSuccess(newReviews));
    }
  } catch (error) {
    yield put(roomChangeReviewError(error));
  }
}

function* getReviewsWorker({
  payload: { roomId },
}: RoomGetReviewsAction): RoomGetReviewGenerator {
  const firebaseApi = new Firebase();
  try {
    const roomDocument = yield firebaseApi.database
      .collection('rooms')
      .doc(roomId)
      .get();

    if (!roomDocument) {
      throw new Error('roomData is null');
    }

    const roomInfo = roomDocument.data();
    if (roomInfo) {
      if (!roomInfo.reviews) {
        throw new Error('reviews is null');
      }

      yield put(roomGetReviewsSuccess(roomInfo.reviews));
    }
  } catch (error) {
    yield put(roomGetReviewsError(error));
  }
}

function* getBookingRoomWorker({
  payload: roomId,
}: RoomBookingDataAction): RoomFetchGenerator {
  const firebaseApi = new Firebase();
  try {
    let bookingDocument;
    yield firebaseApi.database
      .collection('rooms')
      .doc(roomId)
      .get()
      .then((doc) => {
        bookingDocument = doc.data()?.bookings;
      });
    if (!bookingDocument) {
      throw new Error('bookingData is null');
    }
    yield put(roomBookingSuccess(bookingDocument));
  } catch (error) {
    yield put(roomBookingError(error));
  }
}

export function* roomWatcher(): Generator {
  yield takeEvery(RoomTypes.FETCH_ROOM_DATA, getRoomWorker);
  yield takeEvery(RoomTypes.ROOM_ADD_REVIEW, setReviewWorker);
  yield takeEvery(RoomTypes.ROOM_DELETE_REVIEW, deleteReviewWorker);
  yield takeEvery(RoomTypes.ROOM_CHANGE_REVIEW, changeReviewWorker);
  yield takeEvery(RoomTypes.ROOM_GET_REVIEWS, getReviewsWorker);
  yield takeEvery(RoomTypes.BOOKING_ROOM_DATA, getBookingRoomWorker);
}
