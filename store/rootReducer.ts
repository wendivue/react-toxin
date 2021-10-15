import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { RoomsAction } from './rooms/roomsTypes';
import { roomsReducer } from './rooms/roomsReducer';
import { AuthAction } from './auth/authTypes';
import { authReducer } from './auth/authReducer';
import { BookingAction } from './booking/bookingTypes';
import { bookingReducer } from './booking/bookingReducer';
import { roomReducer } from './room/roomReducer';
import { RoomAction } from './room/roomTypes';
import { subscriptionReducer } from './subscription/subscriptionReducer';
import { SubscriptionAction } from './subscription/subscriptionTypes';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  auth: authReducer,
  booking: bookingReducer,
  room: roomReducer,
  subscription: subscriptionReducer,
});

type RootState = ReturnType<typeof rootReducer>;

enum ActionType {
  ROOT_HYDRATION = '__NEXT_REDUX_WRAPPER_HYDRATE__',
}

interface IRootHydrate {
  type: ActionType.ROOT_HYDRATION;
  payload: RootState;
}

type IAction =
  | SubscriptionAction
  | RoomAction
  | BookingAction
  | RoomsAction
  | AuthAction
  | IRootHydrate;

export const reducer = (state: RootState, action: IAction): RootState => {
  if (action.type === HYDRATE) {
    const stateH = state as RootState & { count: number };
    const nextState = {
      ...stateH,
      ...action.payload,
    };
    if (stateH?.count) nextState.count = stateH.count;
    return nextState;
  }
  return rootReducer(state, action);
};

export type { RootState };
