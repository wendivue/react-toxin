import { RoomAction, RoomState, RoomTypes } from './roomTypes';

const initialState: RoomState = {
  isLoadedRoomData: true,
  room: null,
  roomError: null,
  isLoadedBookingsData: true,
  bookings: null,
  bookingsError: null,
  isLoadedReview: false,
  reviews: null,
  reviewError: null,
};

const roomReducer = (
  state: RoomState = initialState,
  action: RoomAction,
): RoomState => {
  switch (action.type) {
    case RoomTypes.FETCH_ROOM_DATA:
      return {
        ...state,
        isLoadedRoomData: true,
        room: null,
        roomError: null,
      };
    case RoomTypes.FETCH_ROOM_DATA_SUCCESS:
      return {
        ...state,
        isLoadedRoomData: false,
        room: action.payload,
        roomError: null,
      };
    case RoomTypes.FETCH_ROOM_DATA_ERROR:
      return {
        ...state,
        isLoadedRoomData: false,
        room: null,
        roomError: action.payload,
      };
    case RoomTypes.ROOM_ADD_REVIEW:
      return {
        ...state,
        isLoadedReview: true,
        reviews: null,
        reviewError: null,
      };
    case RoomTypes.ROOM_ADD_REVIEW_SUCCESS:
      return {
        ...state,
        isLoadedReview: false,
        reviews: action.payload,
        reviewError: null,
      };
    case RoomTypes.ROOM_ADD_REVIEW_ERROR:
      return {
        ...state,
        isLoadedReview: false,
        reviews: null,
        reviewError: action.payload,
      };
    case RoomTypes.ROOM_DELETE_REVIEW:
      return {
        ...state,
        isLoadedReview: true,
        reviews: null,
        reviewError: null,
      };
    case RoomTypes.ROOM_DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoadedReview: false,
        reviews: action.payload,
        reviewError: null,
      };
    case RoomTypes.ROOM_DELETE_REVIEW_ERROR:
      return {
        ...state,
        isLoadedReview: false,
        reviews: null,
        reviewError: action.payload,
      };
    case RoomTypes.ROOM_CHANGE_REVIEW:
      return {
        ...state,
        isLoadedReview: true,
        reviews: null,
        reviewError: null,
      };
    case RoomTypes.ROOM_CHANGE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoadedReview: false,
        reviews: action.payload,
        reviewError: null,
      };
    case RoomTypes.ROOM_CHANGE_REVIEW_ERROR:
      return {
        ...state,
        isLoadedReview: false,
        reviews: null,
        reviewError: action.payload,
      };
    case RoomTypes.ROOM_GET_REVIEWS:
      return {
        ...state,
        isLoadedReview: true,
        reviews: null,
        reviewError: null,
      };
    case RoomTypes.ROOM_GET_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoadedReview: false,
        reviews: action.payload,
        reviewError: null,
      };
    case RoomTypes.ROOM_GET_REVIEWS_ERROR:
      return {
        ...state,
        isLoadedReview: false,
        reviews: null,
        reviewError: action.payload,
      };
    case RoomTypes.BOOKING_ROOM_DATA:
      return {
        ...state,
        isLoadedBookingsData: true,
        bookings: null,
        bookingsError: null,
      };
    case RoomTypes.BOOKING_ROOM_DATA_SUCCESS:
      return {
        ...state,
        isLoadedBookingsData: false,
        bookings: action.payload,
        bookingsError: null,
      };
    case RoomTypes.BOOKING_ROOM_DATA_ERROR:
      return {
        ...state,
        isLoadedBookingsData: false,
        bookings: null,
        bookingsError: action.payload,
      };
    default:
      return { ...state };
  }
};

export { roomReducer };
