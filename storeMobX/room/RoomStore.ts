import { makeAutoObservable } from 'mobx';
import firebase from 'firebase/app';

import { Firebase } from '@/libs/Firebase';

import { RootStoreType } from '../rootStoreType';
import { Room, RoomType } from './roomTypes';
import { hash } from '../../store/booking/helper';
import { RoomBooked, RoomReview } from '../../store/rooms/roomsTypes';

class RoomStore implements RoomType {
  rootStore: RootStoreType;

  isLoadingRoomData = true;

  room: Room | null = null;

  roomError = null;

  isLoadingBookingsData = true;

  bookings: RoomBooked | null = null;

  bookingsError = null;

  isLoadingReview = false;

  reviews: RoomReview | null = null;

  reviewError = null;

  firebaseApi: Firebase;

  constructor(rootStore: RootStoreType) {
    makeAutoObservable(
      this,
      { rootStore: false, firebaseApi: false },
      { autoBind: true },
    );
    this.rootStore = rootStore;
    this.firebaseApi = new Firebase();
  }

  *fetchRoom(roomId: string): Generator {
    this.isLoadingRoomData = true;
    this.roomError = null;
    try {
      const roomDocument = yield this.firebaseApi.fetchRoom(roomId);
      this.room = roomDocument as Room;
    } catch (err) {
      this.room = null;
      this.roomError = err;
    } finally {
      this.isLoadingRoomData = false;
    }
  }

  *fetchRoomBooking(roomId: string): Generator {
    this.isLoadingBookingsData = true;
    this.bookingsError = null;
    try {
      const bookingDocument = yield this.firebaseApi.getBookingRoom(roomId);

      this.bookings = bookingDocument as RoomBooked;
    } catch (err) {
      this.bookings = null;
      this.bookingsError = err;
    } finally {
      this.isLoadingBookingsData = false;
    }
  }

  *getReviews({
    roomId,
  }: {
    roomId: string;
  }): Generator<unknown, void, firebase.firestore.DocumentData> {
    this.isLoadingReview = true;
    this.reviewError = null;
    try {
      const roomDocument = yield this.firebaseApi.fetchRoom(roomId);

      if (!roomDocument) {
        throw new Error('roomData is null');
      }

      if (!roomDocument.reviews) {
        throw new Error('reviews is null');
      }

      this.reviews = roomDocument.reviews;
    } catch (err) {
      this.reviews = null;
      this.reviewError = err;
    } finally {
      this.isLoadingReview = false;
    }
  }

  *setReview({
    roomId,
    text,
    date,
  }: {
    roomId: string;
    text: string;
    date: string;
  }): Generator<unknown, void, firebase.firestore.DocumentData> {
    this.isLoadingReview = true;
    this.reviewError = null;
    try {
      const roomInfo = yield this.firebaseApi.fetchRoom(roomId);

      const user = yield this.firebaseApi.getCurrentUser();

      if (!user) {
        throw new Error('user is null');
      }

      if (!('uid' in user)) {
        throw new Error('uid is not in user');
      }

      const userDocument = yield this.firebaseApi.database
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

        yield this.firebaseApi.database
          .collection('rooms')
          .doc(roomId)
          .update({
            numberOfReviews: roomInfo.numberOfReviews + 1,
            reviews: newReviews,
          });
        this.reviews = newReviews;
      }
    } catch (err) {
      this.reviews = null;
      this.reviewError = err;
    } finally {
      this.isLoadingReview = false;
    }
  }

  *deleteReview({
    roomId,
    reviewId,
  }: {
    roomId: string;
    reviewId: string;
  }): Generator<unknown, void, firebase.firestore.DocumentData> {
    this.isLoadingReview = true;
    this.reviewError = null;
    try {
      const roomDocument = yield this.firebaseApi.database
        .collection('rooms')
        .doc(roomId)
        .get();

      if (!roomDocument) {
        throw new Error('roomData is null');
      }

      const roomInfo = roomDocument.data();

      if (!roomInfo) {
        throw new Error('roomInfo is null');
      }
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
        yield this.firebaseApi.database
          .collection('rooms')
          .doc(roomId)
          .update({
            numberOfReviews: roomInfo.numberOfReviews - 1,
            reviews: newReviews,
          });
        this.reviews = newReviews;
      }
    } catch (err) {
      this.reviews = null;
      this.reviewError = err;
    } finally {
      this.isLoadingReview = false;
    }
  }

  *changeReview({
    roomId,
    reviewId,
    likes,
    text,
  }: {
    roomId: string;
    reviewId: string;
    text?: string;
    likes?: number;
  }): Generator<unknown, void, firebase.firestore.DocumentData> {
    this.isLoadingReview = true;

    try {
      if (!likes && !text) {
        throw new Error('text and likes is undefined');
      }

      const roomDocument = yield this.firebaseApi.database
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

        yield this.firebaseApi.database.collection('rooms').doc(roomId).update({
          reviews: newReviews,
        });
        this.reviews = newReviews;
      }
    } catch (err) {
      this.reviews = null;
      this.reviewError = err;
    } finally {
      this.isLoadingReview = false;
    }
  }
}

export { RoomStore };
