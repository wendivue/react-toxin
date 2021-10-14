import firebase from 'firebase/app';

type SubscriptionError = firebase.firestore.FirestoreError;

type SubscriptionType = {
  lastEmail: true | null;
  isLoading: boolean;
  error: SubscriptionError | null;

  subscribeEmail(email: string): Generator<unknown, void, true>;
};

export type { SubscriptionType, SubscriptionError };
