import { makeAutoObservable } from 'mobx';

import { Firebase } from '@/libs/Firebase';

import { RootStoreType } from '../rootStoreType';
import {
  Booking,
  BookingError,
  Bookings,
  BookingStoreType,
} from './bookingTypes';

class BookingStore implements BookingStoreType {
  rootStore: RootStoreType;

  isBookingLoading = false;

  bookingAddedWithSuccess = false;

  bookings: Bookings | null = null;

  bookingError: BookingError | null = null;

  constructor(rootStore: RootStoreType) {
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });

    this.rootStore = rootStore;
  }

  *addBooking(booking: Booking): Generator<unknown, void, Bookings> {
    this.isBookingLoading = true;
    this.bookingError = null;
    this.bookingAddedWithSuccess = false;

    const firebaseApi = new Firebase();

    try {
      this.bookings = yield firebaseApi.addBooking(booking);
      this.bookingAddedWithSuccess = true;
    } catch (error) {
      this.bookings = null;
      this.bookingError = error;
    } finally {
      this.isBookingLoading = false;
    }
  }

  *deleteBooking(deleteInformation: {
    bookingId: string;
    roomId: string;
  }): Generator<unknown, void, Bookings> {
    this.isBookingLoading = true;
    this.bookingError = null;

    const firebaseApi = new Firebase();

    try {
      this.bookings = yield firebaseApi.deleteBooking(deleteInformation);
    } catch (error) {
      this.bookings = null;
      this.bookingError = error;
    } finally {
      this.isBookingLoading = false;
    }
  }

  *fetchBookings(): Generator<unknown, void, Bookings> {
    this.isBookingLoading = true;
    this.bookingError = null;

    const firebaseApi = new Firebase();

    try {
      this.bookings = yield firebaseApi.fetchBookings();
    } catch (error) {
      this.bookings = null;
      this.bookingError = error;
    } finally {
      this.isBookingLoading = false;
    }
  }
}

export { BookingStore };
