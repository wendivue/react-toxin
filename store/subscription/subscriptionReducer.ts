import {
  SubscriptionAction,
  SubscriptionActionTypes,
  SubscriptionState,
} from './subscriptionTypes';

const initialState: SubscriptionState = {
  lastEmail: null,
  isLoading: false,
  error: null,
};

const subscriptionReducer = (
  state = initialState,
  action: SubscriptionAction,
): SubscriptionState => {
  switch (action.type) {
    case SubscriptionActionTypes.SUBSCRIBE_REQUEST:
      return {
        ...state,
        lastEmail: null,
        isLoading: true,
        error: null,
      };
    case SubscriptionActionTypes.SUBSCRIBE_SUCCESS:
      return {
        ...state,
        lastEmail: action.payload,
        isLoading: false,
        error: null,
      };
    case SubscriptionActionTypes.SUBSCRIBE_ERROR:
      return {
        ...state,
        lastEmail: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { subscriptionReducer };
