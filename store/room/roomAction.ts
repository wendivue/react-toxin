import { RoomBooked, Room, RoomReview } from 'store/rooms/roomsTypes';
import { RoomAction, RoomError, RoomId, RoomTypes } from './roomTypes';

const roomFetch = (roomId: RoomId): RoomAction => ({
  type: RoomTypes.FETCH_ROOM_DATA,
  payload: roomId,
});

const roomFetchSuccess = (room: Room | null): RoomAction => ({
  type: RoomTypes.FETCH_ROOM_DATA_SUCCESS,
  payload: room,
});

const roomFetchError = (error: RoomError): RoomAction => ({
  type: RoomTypes.FETCH_ROOM_DATA_ERROR,
  payload: error,
});

const roomBookingFetch = (roomId: RoomId): RoomAction => ({
  type: RoomTypes.BOOKING_ROOM_DATA,
  payload: roomId,
});

const roomBookingSuccess = (room: RoomBooked | null): RoomAction => ({
  type: RoomTypes.BOOKING_ROOM_DATA_SUCCESS,
  payload: room,
});
const roomBookingError = (error: RoomError): RoomAction => ({
  type: RoomTypes.BOOKING_ROOM_DATA_ERROR,
  payload: error,
});

const roomAddReview = (reviewInfo: {
  roomId: string;
  text: string;
  date: string;
}): RoomAction => {
  return {
    type: RoomTypes.ROOM_ADD_REVIEW,
    payload: reviewInfo,
  };
};

const roomAddReviewSuccess = (review: RoomReview): RoomAction => {
  return {
    type: RoomTypes.ROOM_ADD_REVIEW_SUCCESS,
    payload: review,
  };
};

const roomAddReviewError = (error: RoomError): RoomAction => {
  return {
    type: RoomTypes.ROOM_ADD_REVIEW_ERROR,
    payload: error,
  };
};

const roomDeleteReview = (reviewInfo: {
  roomId: string;
  reviewId: string;
}): RoomAction => {
  return {
    type: RoomTypes.ROOM_DELETE_REVIEW,
    payload: reviewInfo,
  };
};

const roomDeleteReviewSuccess = (review: RoomReview): RoomAction => {
  return {
    type: RoomTypes.ROOM_DELETE_REVIEW_SUCCESS,
    payload: review,
  };
};

const roomDeleteReviewError = (error: RoomError): RoomAction => {
  return {
    type: RoomTypes.ROOM_DELETE_REVIEW_ERROR,
    payload: error,
  };
};

const roomChangeReview = (reviewInfo: {
  roomId: string;
  reviewId: string;
  text?: string;
  likes?: number;
}): RoomAction => {
  return {
    type: RoomTypes.ROOM_CHANGE_REVIEW,
    payload: reviewInfo,
  };
};

const roomChangeReviewSuccess = (review: RoomReview): RoomAction => {
  return {
    type: RoomTypes.ROOM_CHANGE_REVIEW_SUCCESS,
    payload: review,
  };
};

const roomChangeReviewError = (error: RoomError): RoomAction => {
  return {
    type: RoomTypes.ROOM_CHANGE_REVIEW_ERROR,
    payload: error,
  };
};

const roomGetReviews = (reviewInfo: { roomId: string }): RoomAction => {
  return {
    type: RoomTypes.ROOM_GET_REVIEWS,
    payload: reviewInfo,
  };
};

const roomGetReviewsSuccess = (reviews: RoomReview): RoomAction => {
  return {
    type: RoomTypes.ROOM_GET_REVIEWS_SUCCESS,
    payload: reviews,
  };
};

const roomGetReviewsError = (error: RoomError): RoomAction => {
  return {
    type: RoomTypes.ROOM_GET_REVIEWS_ERROR,
    payload: error,
  };
};

export {
  roomFetch,
  roomFetchError,
  roomFetchSuccess,
  roomAddReview,
  roomAddReviewSuccess,
  roomAddReviewError,
  roomDeleteReview,
  roomDeleteReviewSuccess,
  roomDeleteReviewError,
  roomChangeReview,
  roomChangeReviewSuccess,
  roomChangeReviewError,
  roomGetReviews,
  roomGetReviewsSuccess,
  roomGetReviewsError,
  roomBookingFetch,
  roomBookingSuccess,
  roomBookingError,
};
