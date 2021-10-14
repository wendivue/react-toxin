import firebase from 'firebase/app';

import type { RoomGuestsFirebase } from 'storeMobX/rooms/roomsTypes';

import type { RootStoreType } from '../rootStoreType';

type BookingId = string | number;

type BookingDates = {
  dateFrom: string;
  dateTo: string;
};

type RoomInformation = {
  number: number;
  type: 'standard' | 'deluxe' | 'lux';
  images: Array<string>;
  rating: number;
  numberOfReviews: number;
};

type Service = {
  description: string;
  price: number;
};

type AdditionalServices = Record<string, Service>;

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

type Bookings = Record<BookingId, Booking>;

type BookingError = firebase.firestore.FirestoreError | Error;

type BookingStoreType = {
  rootStore: RootStoreType;

  isBookingLoading: boolean;
  bookings: Bookings | null;
  bookingError: BookingError | null;
  bookingAddedWithSuccess: boolean;

  addBooking(booking: Booking): Generator<unknown, void, Bookings>;
  deleteBooking(deleteInformation: {
    bookingId: string;
    roomId: string;
  }): Generator<unknown, void, Bookings>;
  fetchBookings(): Generator<unknown, void, Bookings>;
};

export type {
  BookingStoreType,
  Booking,
  Bookings,
  BookingError,
  AdditionalServices,
};
