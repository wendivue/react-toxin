/* eslint-disable import/no-duplicates */
import firebaseClient from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import nookies from 'nookies';

const defaultConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATA_BASE_URL,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

class Firebase {
  public readonly app: firebaseClient.app.App;

  public readonly database: firebaseClient.firestore.Firestore;

  public readonly auth: firebaseClient.auth.Auth;

  public readonly storage: firebaseClient.storage.Storage;

  constructor(config: Record<string, unknown> = defaultConfig) {
    this.app = firebaseClient.apps.length
      ? firebaseClient.app()
      : firebaseClient.initializeApp(config);
    this.database = this.app.firestore();
    this.storage = this.app.storage();
    this.auth = this.app.auth();
  }

  static toTimestamp(date: Date): firebaseClient.firestore.Timestamp {
    return firebaseClient.firestore.Timestamp.fromDate(date);
  }

  getCurrentUser(): Promise<firebaseClient.User | null> {
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

  idTokenChange(setUser: (state: firebaseClient.User | null) => void): void {
    this.app.auth().onIdTokenChanged(async (clientUser) => {
      // token changed!
      if (!clientUser) {
        // no token found
        setUser(null);
        nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', { path: '/' });
        return;
      }

      // updating token
      const token = await clientUser.getIdToken();
      setUser(clientUser);
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, { path: '/' });
    });
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
}

type Timestamp = firebaseClient.firestore.Timestamp;

export { Firebase, firebaseClient };

export type { Timestamp };
