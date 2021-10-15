import {
  BookingAction,
  BookingActionTypes,
  BookingState,
} from './bookingTypes';

const initialState: BookingState = {
  isBookingLoaded: false,
  bookings: null,
  bookingsError: null,
  bookingsAddedWithSuccess: false,
};

const bookingReducer = (
  state: BookingState = initialState,
  action: BookingAction,
): BookingState => {
  switch (action.type) {
    case BookingActionTypes.ADD_BOOKING:
      return {
        ...state,
        isBookingLoaded: true,
        bookingsError: null,
        bookingsAddedWithSuccess: false,
      };
    case BookingActionTypes.ADD_BOOKING_SUCCESS:
      return {
        ...state,
        isBookingLoaded: false,
        bookings: action.payload,
        bookingsError: null,
        bookingsAddedWithSuccess: true,
      };
    case BookingActionTypes.ADD_BOOKING_ERROR:
      return {
        ...state,
        isBookingLoaded: false,
        bookings: null,
        bookingsAddedWithSuccess: false,
        bookingsError: action.payload,
      };
    case BookingActionTypes.FETCH_BOOKING:
      return {
        ...state,
        isBookingLoaded: true,
        bookingsError: null,
      };

    case BookingActionTypes.FETCH_BOOKING_SUCCESS:
      return {
        ...state,
        isBookingLoaded: false,
        bookings: action.payload,
        bookingsError: null,
      };
    case BookingActionTypes.FETCH_BOOKING_ERROR:
      return {
        ...state,
        isBookingLoaded: false,
        bookings: null,
        bookingsError: action.payload,
      };
    case BookingActionTypes.DELETE_BOOKING:
      return {
        ...state,
        isBookingLoaded: true,
        bookingsError: null,
      };
    case BookingActionTypes.DELETE_BOOKING_SUCCESS:
      return {
        ...state,
        isBookingLoaded: false,
        bookings: action.payload,
        bookingsError: null,
      };
    case BookingActionTypes.DELETE_BOOKING_ERROR:
      return {
        ...state,
        isBookingLoaded: false,
        bookings: null,
        bookingsError: action.payload,
      };
    default:
      return { ...state };
  }
};

export { bookingReducer };
