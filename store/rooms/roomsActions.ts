import { RoomsAction, RoomsActionTypes } from './roomsTypes';
import type { FetchRoomsError, AllRooms, RoomsFilter } from './roomsTypes';

const roomsSetFilter = (filter: RoomsFilter | null): RoomsAction => ({
  type: RoomsActionTypes.SET_FILTER,
  payload: filter,
});

const roomsFetchFiltered = (): RoomsAction => ({
  type: RoomsActionTypes.FETCH_FILTERED_ROOMS,
});

const roomsFetchFilteredSuccess = (rooms: AllRooms): RoomsAction => ({
  type: RoomsActionTypes.FETCH_FILTERED_ROOMS_SUCCESS,
  payload: rooms,
});

const roomsFetchFilteredError = (error: FetchRoomsError): RoomsAction => ({
  type: RoomsActionTypes.FETCH_FILTERED_ROOMS_ERROR,
  payload: error,
});

export {
  roomsFetchFiltered,
  roomsFetchFilteredSuccess,
  roomsFetchFilteredError,
  roomsSetFilter,
};
