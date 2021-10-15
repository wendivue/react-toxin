import firebase from 'firebase/app';
import { PutEffect } from 'redux-saga/effects';

import { Room, RoomGuestsFirebase } from '../rooms/roomsTypes';

type Booking = {
  dates: BookingDates;
  roomId: string;
  roomInformation: RoomInformation;
  additionalServices: AdditionalServices;
  guest: RoomGuestsFirebase;
  pricePerDay: number;
  sale: number;
  totalPrice: number;
  confirmed: boolean;
};
type RoomInformation = {
  number: number;
  type: 'standard' | 'deluxe' | 'lux';
  images: Array<string>;
  rating: number;
  numberOfReviews: number;
};
type BookingDates = {
  dateFrom: string;
  dateTo: string;
};

type Services = {
  description: string;
  price: number;
};

type AdditionalServices = Record<string, Services>;

type BookingId = string | number;

type Bookings = Record<BookingId, Booking>;

type BookingsError = firebase.firestore.FirestoreError | Error;

type BookingState = {
  isBookingLoaded: boolean;
  bookings: Bookings | null;
  bookingsError: BookingsError | null;
  bookingsAddedWithSuccess: boolean;
};

enum BookingActionTypes {
  ADD_BOOKING = 'ADD_BOOKING',
  ADD_BOOKING_SUCCESS = 'ADD_BOOKING_SUCCESS',
  ADD_BOOKING_ERROR = 'ADD_BOOKING_ERROR',

  FETCH_BOOKING = 'FETCH_BOOKING',
  FETCH_BOOKING_SUCCESS = 'FETCH_BOOKING_SUCCESS',
  FETCH_BOOKING_ERROR = 'FETCH_BOOKING_ERROR',

  DELETE_BOOKING = 'DELETE_BOOKING',
  DELETE_BOOKING_SUCCESS = 'DELETE_BOOKING_SUCCESS',
  DELETE_BOOKING_ERROR = 'DELETE_BOOKING_ERROR',
}

type BookingAddAction = {
  type: BookingActionTypes.ADD_BOOKING;
  payload: Booking;
};

type BookingAddSuccess = {
  type: BookingActionTypes.ADD_BOOKING_SUCCESS;
  payload: Bookings;
};

type BookingAddError = {
  type: BookingActionTypes.ADD_BOOKING_ERROR;
  payload: BookingsError | null;
};

type BookingFetchAction = {
  type: BookingActionTypes.FETCH_BOOKING;
};

type BookingFetchSuccess = {
  type: BookingActionTypes.FETCH_BOOKING_SUCCESS;
  payload: Bookings;
};

type BookingFetchError = {
  type: BookingActionTypes.FETCH_BOOKING_ERROR;
  payload: BookingsError | null;
};
type BookingDeleteAction = {
  type: BookingActionTypes.DELETE_BOOKING;
  payload: string[];
};

type BookingDeleteSuccess = {
  type: BookingActionTypes.DELETE_BOOKING_SUCCESS;
  payload: Bookings;
};

type BookingDeleteError = {
  type: BookingActionTypes.DELETE_BOOKING_ERROR;
  payload: BookingsError | null;
};

type BookingAction =
  | BookingAddAction
  | BookingAddError
  | BookingAddSuccess
  | BookingFetchAction
  | BookingFetchError
  | BookingFetchSuccess
  | BookingDeleteAction
  | BookingDeleteError
  | BookingDeleteSuccess;

type BookingAddGenerator = Generator<
  | Promise<
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
      | firebase.firestore.DocumentData
      | firebase.User
      | void
      | null
      | undefined
    >
  | Promise<firebase.User | null>
  | PutEffect,
  void,
  Room | Bookings | firebase.User | null
>;

type BookingDeleteGenerator = Generator<
  | Promise<
      | string
      | firebase.firestore.DocumentData
      | firebase.auth.UserCredential
      | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
      | firebase.User
      | null
      | undefined
      | void
    >
  | PutEffect,
  void,
  Room | Bookings | firebase.User
>;

export { BookingActionTypes };

export type {
  AdditionalServices,
  Booking,
  Bookings,
  BookingState,
  BookingAction,
  BookingAddAction,
  BookingsError,
  BookingFetchAction,
  BookingFetchSuccess,
  BookingFetchError,
  BookingAddGenerator,
  BookingDeleteAction,
  BookingDeleteGenerator,
};
