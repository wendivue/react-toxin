import firebase from 'firebase/app';
import { Effect } from 'redux-saga/effects';

type SubscriptionState = {
  lastEmail: null | string;
  isLoading: boolean;
  error: null | firebase.firestore.FirestoreError;
};

enum SubscriptionActionTypes {
  SUBSCRIBE_REQUEST = 'SUBSCRIBE_REQUEST',
  SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS',
  SUBSCRIBE_ERROR = 'SUBSCRIBE_ERROR',
}

type SubscribeRequestAction = {
  type: SubscriptionActionTypes.SUBSCRIBE_REQUEST;
  payload: string;
};

type SubscribeSuccessAction = {
  type: SubscriptionActionTypes.SUBSCRIBE_SUCCESS;
  payload: string;
};

type SubscribeErrorAction = {
  type: SubscriptionActionTypes.SUBSCRIBE_ERROR;
  payload: firebase.firestore.FirestoreError;
};

type SubscriptionAction =
  | SubscribeRequestAction
  | SubscribeSuccessAction
  | SubscribeErrorAction;

type SubscribeRequestEffect = Effect<
  SubscribeRequestAction['type'],
  SubscribeRequestAction['payload']
>;

export { SubscriptionActionTypes };

export type { SubscriptionState, SubscriptionAction, SubscribeRequestEffect };
