import * as firebaseAdmin from 'firebase-admin';
import { Booking } from 'store/booking/bookingTypes';
import { UserInfo } from '../../store/auth/authTypes';

const privateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY;
const clientEmail = process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

class FirebaseAdmin {
  readonly auth: firebaseAdmin.auth.Auth;

  readonly database: FirebaseFirestore.Firestore;

  constructor() {
    if (!firebaseAdmin.apps.length) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
          privateKey: privateKey?.replace(/\\n/g, '\n'),
          clientEmail,
          projectId,
        }),
        databaseURL: `https://${projectId}.firebaseio.com`,
      });
    }
    this.auth = firebaseAdmin.auth();
    this.database = firebaseAdmin.firestore();
  }

  async getUser(uid: string): Promise<UserInfo | null> {
    const userInfo = await this.database.collection('users').doc(uid).get();
    if (!userInfo.exists) {
      return null;
    }
    return userInfo.data() as UserInfo;
  }

  async getBooking(uid: string): Promise<Booking | null> {
    const booking = await this.database.collection('bookings').doc(uid).get();
    if (!booking.exists) {
      return null;
    }
    return booking.data() as Booking;
  }
}

export { FirebaseAdmin, firebaseAdmin };
