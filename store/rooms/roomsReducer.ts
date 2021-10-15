import type { RoomsAction, RoomsState } from './roomsTypes';
import { RoomsActionTypes } from './roomsTypes';

const initialState: RoomsState = {
  isRoomsLoading: false,
  rooms: {},
  roomsError: null,
  filteredRooms: {},
  filter: null,
};

const roomsReducer = (
  state: RoomsState = initialState,
  action: RoomsAction,
): RoomsState => {
  switch (action.type) {
    case RoomsActionTypes.SET_FILTER:
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };
    case RoomsActionTypes.FETCH_FILTERED_ROOMS:
      return {
        ...state,
        isRoomsLoading: true,
        filteredRooms: {},
      };
    case RoomsActionTypes.FETCH_FILTERED_ROOMS_SUCCESS:
      return {
        ...state,
        filteredRooms: action.payload,
        isRoomsLoading: false,
      };
    case RoomsActionTypes.FETCH_FILTERED_ROOMS_ERROR:
      return {
        ...state,
        roomsError: action.payload,
        isRoomsLoading: false,
      };
    default:
      return state;
  }
};

export { roomsReducer };
