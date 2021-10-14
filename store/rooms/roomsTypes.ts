import { PutEffect, SelectEffect } from 'redux-saga/effects';
import firebase from 'firebase/app';

enum RoomsActionTypes {
  SET_FILTER = 'SET_FILTER',
  FETCH_FILTERED_ROOMS = 'FETCH_FILTERED_ROOMS',
  FETCH_FILTERED_ROOMS_SUCCESS = 'FETCH_FILTERED_ROOMS_SUCCESS',
  FETCH_FILTERED_ROOMS_ERROR = 'FETCH_FILTERED_ROOMS_ERROR',
}

type RoomFeatures = {
  noiseAbsorbingWalls?: boolean;
  windowsInBedrooms?: boolean;
  fireplace?: boolean;
  fridge?: boolean;
  table?: boolean;
  iron?: boolean;
  television?: boolean;
  balcony?: boolean;
  fan?: boolean;
  gym?: boolean;
  rockingChair?: boolean;
  jacuzzi?: boolean;
  feedingChair?: boolean;
  cot?: boolean;
  shampoo?: boolean;
  breakfast?: boolean;
};

type RoomRules = {
  smoke: boolean;
  pets: boolean;
  guests: boolean;
  parties: boolean;
  isArrivalTimeLimited: boolean;
};

type RoomAvailabilities = {
  wideCorridor: boolean;
  helpForInvalids: boolean;
};

type RoomConveniences = {
  bedrooms: Record<
    string,
    {
      value?: number | undefined;
      maxValue?: number | undefined;
      isDisabled?: boolean | undefined;
    }
  >;
  beds: Record<
    string,
    {
      value?: number | undefined;
      maxValue?: number | undefined;
      isDisabled?: boolean | undefined;
    }
  >;
  bathrooms: Record<
    string,
    {
      value?: number | undefined;
      maxValue?: number | undefined;
      isDisabled?: boolean | undefined;
    }
  >;
};

type RoomGuests = {
  adults: {
    value?: number | undefined;
    maxValue?: number | undefined;
    isDisabled?: boolean | undefined;
  };
  kids: {
    value?: number | undefined;
    maxValue?: number | undefined;
    isDisabled?: boolean | undefined;
  };
  babies: {
    value?: number | undefined;
    maxValue?: number | undefined;
    isDisabled?: boolean | undefined;
  };
};

type RoomGuestsFirebase = {
  adults: number;
  kids: number;
  babies: number;
};

type RoomBooked = Record<
  UserId,
  Record<
    BookingId,
    {
      dateFrom: string;
      dateTo: string;
    }
  >
>;

type UserId = string;
type BookingId = string;

type RoomReview = Record<
  string,
  {
    name: string;
    img: string | null;
    userId: string | number;
    text: string;
    date: string;
    likes: number;
  }
>;

type Room = {
  number: number;
  type: 'standard' | 'deluxe' | 'lux';
  images: Array<string>;
  price: number;
  rating: number;
  numberOfReviews: number;
  bookings?: RoomBooked;
  features: RoomFeatures;
  rules: RoomRules;
  conveniences: RoomConveniences;
  availabilities: RoomAvailabilities;
  guests: RoomGuestsFirebase;
  reviews?: RoomReview;
  votes: {
    great: number;
    good: number;
    satisfactorily: number;
    bad: number;
    terrible: number;
  };
};

type RoomFirebase = {
  number: number;
  type: 'standard' | 'deluxe' | 'lux';
  images: Array<string>;
  price: number;
  rating: number;
  numberOfReviews: number;
  bookings?: RoomBooked;
  features: RoomFeatures;
  rules: RoomRules;
  conveniences: RoomConveniences;
  availabilities: RoomAvailabilities;
  guests: RoomGuestsFirebase;
};

type AllRooms = Record<string, Room> | Record<string, RoomFirebase>;

type FetchRoomsError = firebase.firestore.FirestoreError;

type RoomsFilter = {
  dates?: {
    dateFrom: number | null;
    dateTo: number | null;
  };
  priceRange?: [number, number];
  rules?: Partial<RoomRules>;
  availabilities?: Partial<RoomAvailabilities>;
  conveniences?: Partial<RoomConveniences>;
  features?: RoomFeatures;
  guests?: Partial<RoomGuests>;
};

type RoomsFetchFilteredAction = {
  type: RoomsActionTypes.FETCH_FILTERED_ROOMS;
};

type RoomsFetchFilteredSuccessAction = {
  type: RoomsActionTypes.FETCH_FILTERED_ROOMS_SUCCESS;
  payload: AllRooms;
};

type RoomsFetchFilteredErrorAction = {
  type: RoomsActionTypes.FETCH_FILTERED_ROOMS_ERROR;
  payload: FetchRoomsError;
};

type RoomsSetFilter = {
  type: RoomsActionTypes.SET_FILTER;
  payload: RoomsFilter | null;
};

type RoomsAction =
  | RoomsFetchFilteredAction
  | RoomsFetchFilteredSuccessAction
  | RoomsFetchFilteredErrorAction
  | RoomsSetFilter;

type RoomsState = {
  isRoomsLoading: boolean;
  rooms: AllRooms;
  roomsError: FetchRoomsError | null;
  filter: RoomsFilter | null;
  filteredRooms: AllRooms;
};

type RoomsFetchFilteredGenerator = Generator<
  | Promise<firebase.firestore.QuerySnapshot>
  | PutEffect<RoomsAction>
  | SelectEffect,
  void,
  firebase.firestore.QuerySnapshot<RoomFirebase> | RoomsState['filter']
>;

export { RoomsActionTypes };

export type {
  RoomsAction,
  BookingId,
  RoomsFilter,
  RoomBooked,
  RoomReview,
  RoomFeatures,
  RoomRules,
  RoomAvailabilities,
  RoomGuests,
  RoomGuestsFirebase,
  RoomConveniences,
  Room,
  AllRooms,
  FetchRoomsError,
  RoomsState,
  RoomsFetchFilteredGenerator,
};
