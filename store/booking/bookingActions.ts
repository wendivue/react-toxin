import {
  Booking,
  BookingAction,
  BookingActionTypes,
  Bookings,
  BookingsError,
} from './bookingTypes';

const bookingAdd = (booking: Booking): BookingAction => ({
  type: BookingActionTypes.ADD_BOOKING,
  payload: booking,
});

const bookingAddSuccess = (bookings: Bookings): BookingAction => ({
  type: BookingActionTypes.ADD_BOOKING_SUCCESS,
  payload: bookings,
});

const bookingAddError = (error: BookingsError): BookingAction => ({
  type: BookingActionTypes.ADD_BOOKING_ERROR,
  payload: error,
});

const bookingFetch = (): BookingAction => ({
  type: BookingActionTypes.FETCH_BOOKING,
});

const bookingFetchSuccess = (bookings: Bookings): BookingAction => ({
  type: BookingActionTypes.FETCH_BOOKING_SUCCESS,
  payload: bookings,
});

const bookingFetchError = (error: BookingsError): BookingAction => ({
  type: BookingActionTypes.FETCH_BOOKING_ERROR,
  payload: error,
});
const bookingDelete = (bookingId: string[]): BookingAction => ({
  type: BookingActionTypes.DELETE_BOOKING,
  payload: bookingId,
});

const bookingDeleteSuccess = (bookings: Bookings): BookingAction => ({
  type: BookingActionTypes.DELETE_BOOKING_SUCCESS,
  payload: bookings,
});

const bookingDeleteError = (error: BookingsError): BookingAction => ({
  type: BookingActionTypes.DELETE_BOOKING_ERROR,
  payload: error,
});

export {
  bookingAdd,
  bookingAddSuccess,
  bookingAddError,
  bookingFetch,
  bookingFetchError,
  bookingFetchSuccess,
  bookingDelete,
  bookingDeleteError,
  bookingDeleteSuccess,
};
