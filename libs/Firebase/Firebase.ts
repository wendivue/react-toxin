/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { User, UserInfo } from 'storeMobX/auth/authTypes';

import {
  AllRooms,
  Room,
  RoomsFilterFirebase,
} from 'storeMobX/rooms/roomsTypes';
import { Booking, Bookings } from 'storeMobX/booking/bookingTypes';
import { hash } from 'helpers/hash';

import { isDatesMatch, isConveniencesMath, isGuestsMatch } from './filterRooms';

const defaultConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

class Firebase {
  public readonly app: firebase.app.App;

  public readonly database: firebase.firestore.Firestore;

  public readonly auth: firebase.auth.Auth;

  public readonly storage: firebase.storage.Storage;

  constructor(config: Record<string, unknown> = defaultConfig) {
    this.app = firebase.apps.length
      ? firebase.app()
      : firebase.initializeApp(config);
    this.database = this.app.firestore();
    this.storage = this.app.storage();
    this.auth = this.app.auth();
  }

  static toTimestamp(date: Date): firebase.firestore.Timestamp {
    return firebase.firestore.Timestamp.fromDate(date);
  }

  getCurrentUser(): Promise<firebase.User | null> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }

  async signinRequest({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error('user is null');
      }

      const userDocument = await this.database
        .collection('users')
        .doc(user.uid)
        .get();

      if (typeof userDocument !== 'object') {
        throw new Error('userDocument is not an object');
      }

      const userInfo = userDocument.data() as UserInfo;

      if (!userInfo) {
        throw new Error('user info is null');
      }

      return {
        userInfo,
        firebaseUser: user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async singupRequest({
    email,
    password,
    userInfo,
  }: {
    email: string;
    password: string;
    userInfo: UserInfo;
  }): Promise<User> {
    try {
      await this.auth.signOut();

      await this.auth.createUserWithEmailAndPassword(email, password);
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error('user is null');
      }

      await this.database.collection('users').doc(user.uid).set(userInfo);

      return {
        userInfo,
        firebaseUser: user,
      };
    } catch (error) {
      await this.auth.currentUser?.delete();
      throw new Error(error);
    }
  }

  async updateUserState(): Promise<User | null> {
    try {
      const user = await this.getCurrentUser();

      if (!user) {
        return null;
      }

      if (!('uid' in user)) {
        throw new Error('uid is not in user');
      }

      const userDocument = await this.database
        .collection('users')
        .doc(user.uid)
        .get();

      if (!userDocument) {
        throw new Error('userDocument is null');
      }

      const userInfo = userDocument.data() as UserInfo;

      if (!userInfo) {
        throw new Error('userInfo is null');
      }

      return {
        userInfo,
        firebaseUser: user,
      };
    } catch (error) {
      return error;
    }
  }

  async setLogin({
    name,
    surname,
  }: {
    name: string;
    surname: string;
  }): Promise<User> {
    try {
      const user = await this.getCurrentUser();

      if (!user) {
        throw new Error('user is null');
      }

      const userDocument = await this.database
        .collection('users')
        .doc(user.uid)
        .get();

      if (!userDocument) {
        throw new Error('userDocument is null');
      }

      const userInfo = userDocument.data() as UserInfo;

      if (!userInfo) {
        throw new Error('userInfo is null');
      }

      userInfo.name = name;
      userInfo.surname = surname;

      await this.database.collection('users').doc(user.uid).set(userInfo);

      return {
        userInfo,
        firebaseUser: user,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<null> {
    try {
      if (!this.auth.currentUser) {
        throw new Error('firebaseApi.auth.currentUser is null');
      }

      const emailCred = firebase.auth.EmailAuthProvider.credential(
        email,
        password,
      );

      await this.app
        .auth()
        .currentUser?.reauthenticateWithCredential(emailCred);

      await this.database
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .delete();

      await this.auth.currentUser.delete();
      return null;
    } catch (error) {
      return error;
    }
  }

  async subscribeEmail(email: string): Promise<true> {
    try {
      const user = await this.getCurrentUser();

      if (email === user?.email) {
        const userRef = this.database.collection('users').doc(`${user.uid}`);

        await userRef.update({ isSubscribed: true });

        return true;
      }

      const subscribedEmailsRef = this.database.collection('subscribedEmails');
      const emailsSnapshot = await subscribedEmailsRef.get();
      let isEmailAlreadyExists = false;

      emailsSnapshot.forEach((emailDocument) => {
        if (email === emailDocument.data().email) {
          isEmailAlreadyExists = true;
        }
      });

      if (isEmailAlreadyExists) {
        return true;
      }

      await subscribedEmailsRef.add({ email });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchRoom(roomId: string): Promise<firebase.firestore.DocumentData> {
    const roomDocument = await this.database
      .collection('rooms')
      .doc(roomId)
      .get()
      .then((doc) => doc.data());
    if (!roomDocument) {
      throw new Error('roomData is null');
    }
    return roomDocument;
  }

  async getBookingRoom(
    roomId: string,
  ): Promise<firebase.firestore.DocumentData> {
    const bookingDocument = await this.database
      .collection('rooms')
      .doc(roomId)
      .get()
      .then((doc) => doc.data()?.bookings);

    if (!bookingDocument) {
      throw new Error('bookingData is null');
    }
    return bookingDocument;
  }

  async setAvatar(avatar: File): Promise<User> {
    try {
      const user = await this.getCurrentUser();

      if (!user) {
        throw new Error('user is null');
      }

      const userDocument = await this.database
        .collection('users')
        .doc(user.uid)
        .get();

      const storageRef = this.storage.ref(`${user.uid}/img/avatar.jpg`);

      if (typeof userDocument !== 'object') {
        throw new Error('userDocument is not an object');
      }

      storageRef.put(avatar);
      await storageRef.getDownloadURL();

      const userInfo = userDocument.data() as UserInfo;

      if (userInfo) {
        const downloadUrl = await storageRef.getDownloadURL();
        userInfo.avatar = downloadUrl.toString();

        await this.database.collection('users').doc(user.uid).set(userInfo);

        return {
          userInfo,
          firebaseUser: user,
        };
      }
      throw new Error('user info not found');
    } catch (error) {
      return error;
    }
  }

  async signOutRequest(): Promise<null> {
    try {
      await this.auth.signOut();

      return null;
    } catch (error) {
      return error;
    }
  }

  async updateUserLikesWorker({ likes }: { likes: string[] }): Promise<User> {
    try {
      const user = await this.getCurrentUser();

      if (!user) {
        throw new Error('user is null');
      }

      const userDocument = await this.database
        .collection('users')
        .doc(user.uid)
        .get();

      if (typeof userDocument !== 'object') {
        throw new Error('userDocument is not an object');
      }

      const userInfo = userDocument.data() as UserInfo;

      if (userInfo) {
        userInfo.reviewLikes = likes;

        await this.database.collection('users').doc(user.uid).set(userInfo);
      } else {
        throw new Error('user info not found');
      }

      return {
        userInfo,
        firebaseUser: user,
      };
    } catch (error) {
      return error;
    }
  }

  async updateUserPassword({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }): Promise<User> {
    try {
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error('user is null');
      }
      if (typeof user !== 'object') {
        throw new Error('user is null');
      }
      if (!('email' in user)) {
        throw new Error('user has not email field');
      }
      const userEmail = user.email;

      if (!userEmail) {
        throw new Error('firebaseApi.auth.currentUser.email is null');
      }

      if (!user) {
        throw new Error('firebaseApi.auth.currentUser is null');
      }

      const emailCred = firebase.auth.EmailAuthProvider.credential(
        userEmail,
        oldPassword,
      );

      await this.app
        .auth()
        .currentUser?.reauthenticateWithCredential(emailCred);

      const userDocument = await this.database
        .collection('users')
        .doc(user.uid)
        .get();

      if (!userDocument) {
        throw new Error('userDocument is null');
      }

      if (typeof userDocument !== 'object') {
        throw new Error('userDocument is not an object');
      }

      if ('email' in userDocument) {
        throw new Error('userDocument is not of type Document');
      }

      const userInfo = userDocument.data() as UserInfo;
      if (userInfo) {
        await user.updatePassword(newPassword);
        return { userInfo, firebaseUser: user };
      }
      throw new Error('user info not found');
    } catch (error) {
      return error;
    }
  }

  async addBooking(booking: Booking): Promise<Bookings> {
    try {
      const user = await this.getCurrentUser();

      if (!user) {
        throw new Error('user is null');
      }

      const bookingsOld = await this.database
        .collection('bookings')
        .doc(user.uid)
        .get()
        .then((dataOld) => dataOld.data());

      const roomOld = await this.database
        .collection('rooms')
        .doc(booking.roomId)
        .get()
        .then((dataOld) => dataOld.data());

      const bookingId = hash(user.uid);

      await this.database
        .collection('bookings')
        .doc(user.uid)
        .set({ ...bookingsOld, [bookingId]: booking });

      await this.database
        .collection('rooms')
        .doc(booking.roomId)
        .update({
          bookings: {
            ...roomOld?.bookings,
            [user.uid]: {
              ...roomOld?.bookings[user.uid],
              [bookingId]: {
                dateFrom: booking.dates.dateFrom,
                dateTo: booking.dates.dateTo,
              },
            },
          },
        });

      return { ...bookingsOld, [bookingId]: booking };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteBooking({
    bookingId,
    roomId,
  }: {
    bookingId: string;
    roomId: string;
  }): Promise<Bookings> {
    try {
      const user = await this.getCurrentUser();

      if (!user) {
        throw new Error('user is null');
      }

      const bookingsOld = await this.database
        .collection('bookings')
        .doc(user.uid)
        .get()
        .then((dataOld) => dataOld.data());

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [bookingId]: _, ...bookingNew } = bookingsOld || {};

      await this.database
        .collection('bookings')
        .doc(user.uid)
        .set({ ...bookingNew });

      const roomOld = await this.database
        .collection('rooms')
        .doc(roomId)
        .get()
        .then((dataOld) => dataOld.data());

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [bookingId]: __, ...roomNew } = roomOld?.bookings[user.uid];
      await this.database
        .collection('rooms')
        .doc(roomId)
        .update({
          bookings: {
            ...roomOld?.bookings,
            [user.uid]: {
              ...roomNew,
            },
          },
        });

      return bookingNew;
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchBookings(): Promise<Bookings> {
    try {
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error('user is null');
      }

      const bookings = await this.database
        .collection('bookings')
        .doc(user.uid)
        .get()
        .then((data) => data.data());

      return bookings || {};
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchFilteredRooms(filter: RoomsFilterFirebase): Promise<AllRooms> {
    const {
      dates,
      priceRange,
      rules,
      availabilities,
      conveniences,
      features,
      guests,
    } = filter;

    try {
      if ('query' in filter) {
        throw new Error('filter is not of the type RoomsState["filter"]');
      }

      const allRooms: AllRooms = {};

      // eslint-disable-next-line max-len
      let filteredRoomsQuery: firebase.firestore.Query<firebase.firestore.DocumentData> =
        this.database.collection('rooms');

      if (priceRange) {
        filteredRoomsQuery = filteredRoomsQuery.where(
          'price',
          '>=',
          priceRange[0],
        );
        filteredRoomsQuery = filteredRoomsQuery.where(
          'price',
          '<=',
          priceRange[1],
        );
      }
      if (rules) {
        Object.entries(rules).forEach(([ruleName, ruleValue]) => {
          if (ruleValue) {
            filteredRoomsQuery = filteredRoomsQuery.where(
              `rules.${ruleName}`,
              '==',
              true,
            );
          }
        });
      }
      if (availabilities) {
        Object.entries(availabilities).forEach(
          ([availabilityName, availabilityValue]) => {
            if (availabilityValue) {
              filteredRoomsQuery = filteredRoomsQuery.where(
                `availabilities.${availabilityName}`,
                '==',
                true,
              );
            }
          },
        );
      }
      if (features) {
        Object.entries(features).forEach(([featureName, featureValue]) => {
          if (featureValue) {
            filteredRoomsQuery = filteredRoomsQuery.where(
              `features.${featureName}`,
              '==',
              true,
            );
          }
        });
      }

      const roomsSnapshot = await filteredRoomsQuery
        .orderBy('price')
        .orderBy('number')
        .get();

      roomsSnapshot.forEach((roomDocument) => {
        const room = roomDocument.data();

        // Фильтрация по значениям, которые нельзя отфильтровать на firebase
        let isMatch = true;
        if (dates) {
          isMatch = isMatch && isDatesMatch(room.bookings, dates);
        }
        if (conveniences) {
          isMatch =
            isMatch && isConveniencesMath(room.conveniences, conveniences);
        }
        if (guests) {
          isMatch = isMatch && isGuestsMatch(room.guests, guests);
        }
        if (isMatch) {
          allRooms[roomDocument.id] = room as Room;
        }
      });

      return allRooms;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { Firebase };
