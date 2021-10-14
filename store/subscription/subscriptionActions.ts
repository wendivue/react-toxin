import firebase from 'firebase/app';

import {
  SubscriptionAction,
  SubscriptionActionTypes,
} from './subscriptionTypes';

const subscribeRequest = (email: string): SubscriptionAction => ({
  type: SubscriptionActionTypes.SUBSCRIBE_REQUEST,
  payload: email,
});

const subscribeSuccess = (email: string): SubscriptionAction => ({
  type: SubscriptionActionTypes.SUBSCRIBE_SUCCESS,
  payload: email,
});

const subscribeError = (
  error: firebase.firestore.FirestoreError,
): SubscriptionAction => ({
  type: SubscriptionActionTypes.SUBSCRIBE_ERROR,
  payload: error,
});

export { subscribeRequest, subscribeSuccess, subscribeError };
