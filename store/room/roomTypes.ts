import firebase from 'firebase/app';
import { PutEffect } from 'redux-saga/effects';

import { UserInfo } from '../auth/authTypes';
import { Room, RoomBooked, RoomReview } from '../rooms/roomsTypes';

enum RoomTypes {
  FETCH_ROOM_DATA = 'FETCH_ROOM_DATA',
  FETCH_ROOM_DATA_SUCCESS = 'FETCH_ROOM_DATA_SUCCESS',
  FETCH_ROOM_DATA_ERROR = 'FETCH_ROOM_DATA_ERROR',

  ROOM_ADD_REVIEW = 'ROOM_ADD_REVIEW',
  ROOM_ADD_REVIEW_SUCCESS = 'ROOM_ADD_REVIEW_SUCCESS',
  ROOM_ADD_REVIEW_ERROR = 'ROOM_ADD_REVIEW_ERROR',

  ROOM_DELETE_REVIEW = 'ROOM_DELETE_REVIEW',
  ROOM_DELETE_REVIEW_SUCCESS = 'ROOM_DELETE_REVIEW_SUCCESS',
  ROOM_DELETE_REVIEW_ERROR = 'ROOM_DELETE_REVIEW_ERROR',

  ROOM_CHANGE_REVIEW = 'ROOM_CHANGE_REVIEW',
  ROOM_CHANGE_REVIEW_SUCCESS = 'ROOM_CHANGE_REVIEW_SUCCESS',
  ROOM_CHANGE_REVIEW_ERROR = 'ROOM_CHANGE_REVIEW_ERROR',

  ROOM_GET_REVIEWS = 'ROOM_GET_REVIEWS',
  ROOM_GET_REVIEWS_SUCCESS = 'ROOM_GET_REVIEWS_SUCCESS',
  ROOM_GET_REVIEWS_ERROR = 'ROOM_GET_REVIEWS_ERROR',

  BOOKING_ROOM_DATA = 'BOOKING_ROOM_DATA',
  BOOKING_ROOM_DATA_SUCCESS = 'BOOKING_ROOM_DATA_SUCCESS',
  BOOKING_ROOM_DATA_ERROR = 'BOOKING_ROOM_DATA_ERROR',
}

type RoomError = firebase.firestore.FirestoreError | Error;

type RoomState = {
  isLoadedRoomData: boolean;
  room: Room | null;
  roomError: RoomError | null;
  isLoadedBookingsData: boolean;
  bookings: RoomBooked | null;
  bookingsError: RoomError | null;
  isLoadedReview: boolean;
  reviews: RoomReview | null;
  reviewError: RoomError | null;
};

type RoomId = string;

type RoomFetchDataAction = {
  type: RoomTypes.FETCH_ROOM_DATA;
  payload: RoomId;
};

type RoomFetchDataSuccess = {
  type: RoomTypes.FETCH_ROOM_DATA_SUCCESS;
  payload: Room | null;
};

type RoomFetchDataError = {
  type: RoomTypes.FETCH_ROOM_DATA_ERROR;
  payload: RoomError;
};

type RoomAddReviewAction = {
  type: RoomTypes.ROOM_ADD_REVIEW;
  payload: {
    roomId: string;
    text: string;
    date: string;
  };
};

type RoomAddReviewSuccess = {
  type: RoomTypes.ROOM_ADD_REVIEW_SUCCESS;
  payload: RoomReview;
};

type RoomAddReviewError = {
  type: RoomTypes.ROOM_ADD_REVIEW_ERROR;
  payload: RoomError;
};

type RoomDeleteReviewAction = {
  type: RoomTypes.ROOM_DELETE_REVIEW;
  payload: {
    roomId: string;
    reviewId: string;
  };
};

type RoomDeleteReviewSuccess = {
  type: RoomTypes.ROOM_DELETE_REVIEW_SUCCESS;
  payload: RoomReview;
};

type RoomDeleteReviewError = {
  type: RoomTypes.ROOM_DELETE_REVIEW_ERROR;
  payload: RoomError;
};

type RoomChangeReviewAction = {
  type: RoomTypes.ROOM_CHANGE_REVIEW;
  payload: {
    roomId: string;
    reviewId: string;
    text?: string;
    likes?: number;
  };
};

type RoomChangeReviewSuccess = {
  type: RoomTypes.ROOM_CHANGE_REVIEW_SUCCESS;
  payload: RoomReview;
};

type RoomChangeReviewError = {
  type: RoomTypes.ROOM_CHANGE_REVIEW_ERROR;
  payload: RoomError;
};

type RoomGetReviewsAction = {
  type: RoomTypes.ROOM_GET_REVIEWS;
  payload: { roomId: string };
};

type RoomGetReviewsSuccess = {
  type: RoomTypes.ROOM_GET_REVIEWS_SUCCESS;
  payload: RoomReview;
};

type RoomGetReviewsError = {
  type: RoomTypes.ROOM_GET_REVIEWS_ERROR;
  payload: RoomError;
};

type RoomBookingDataAction = {
  type: RoomTypes.BOOKING_ROOM_DATA;
  payload: RoomId;
};

type RoomBookingDataSuccess = {
  type: RoomTypes.BOOKING_ROOM_DATA_SUCCESS;
  payload: RoomBooked | null;
};
type RoomBookingDataError = {
  type: RoomTypes.BOOKING_ROOM_DATA_ERROR;
  payload: RoomError;
};

type RoomAction =
  | RoomFetchDataAction
  | RoomFetchDataSuccess
  | RoomFetchDataError
  | RoomAddReviewAction
  | RoomAddReviewSuccess
  | RoomAddReviewError
  | RoomDeleteReviewAction
  | RoomDeleteReviewSuccess
  | RoomDeleteReviewError
  | RoomChangeReviewAction
  | RoomChangeReviewSuccess
  | RoomChangeReviewError
  | RoomGetReviewsAction
  | RoomGetReviewsSuccess
  | RoomGetReviewsError
  | RoomBookingDataAction
  | RoomBookingDataSuccess
  | RoomBookingDataError;

type RoomFetchGenerator = Generator<
  | Promise<
      | string
      | void
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    >
  | PutEffect
  | firebase.firestore.DocumentData
  | undefined
>;

type RoomAddReviewGenerator = Generator<
  | Promise<
      | string
      | void
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
    >
  | PutEffect
  | Promise<firebase.User | null>
  | undefined,
  void,
  | firebase.firestore.DocumentData
  | null
  | firebase.firestore.DocumentSnapshot<UserInfo>
>;

type RoomDeleteReviewGenerator = Generator<
  /* eslint-disable-next-line */
  | Promise<void | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>
  | PutEffect
  | undefined,
  void,
  firebase.firestore.DocumentData
>;

type RoomChangeReviewGenerator = Generator<
  /* eslint-disable-next-line */
  | Promise<void | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>
  | PutEffect
  | undefined,
  void,
  firebase.firestore.DocumentData
>;

type RoomGetReviewGenerator = Generator<
  /* eslint-disable-next-line */
  | Promise<void | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>
  | PutEffect
  | undefined,
  void,
  firebase.firestore.DocumentData
>;

export { RoomTypes };
export type {
  RoomId,
  RoomState,
  RoomAction,
  RoomError,
  RoomFetchDataAction,
  RoomFetchDataSuccess,
  RoomFetchDataError,
  RoomBookingDataSuccess,
  RoomBookingDataAction,
  RoomBookingDataError,
  RoomFetchGenerator,
  RoomAddReviewAction,
  RoomAddReviewSuccess,
  RoomAddReviewError,
  RoomAddReviewGenerator,
  RoomDeleteReviewAction,
  RoomDeleteReviewSuccess,
  RoomDeleteReviewError,
  RoomDeleteReviewGenerator,
  RoomChangeReviewAction,
  RoomChangeReviewSuccess,
  RoomChangeReviewError,
  RoomChangeReviewGenerator,
  RoomGetReviewsAction,
  RoomGetReviewsSuccess,
  RoomGetReviewsError,
  RoomGetReviewGenerator,
};
