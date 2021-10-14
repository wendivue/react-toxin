import { AuthError } from '../auth/authTypes';
import { RootStoreType } from '../rootStoreType';

type RoomsStoreType = {
  rootStore: RootStoreType;
  isRoomsLoading: boolean;
  roomsError: null | AuthError;
  filteredRooms: AllRooms | null;
  filter: RoomsFilterFirebase | null;
  setFilter: (filter: RoomsFilterFirebase) => void;
  fetchFiltered: () => Generator<unknown, void, AllRooms>;
};

type UserId = string;
type BookingId = string;

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

type RoomAvailabilities = {
  wideCorridor: boolean;
  helpForInvalids: boolean;
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

type RoomsFilterFirebase = {
  dates?: {
    dateFrom: number | null;
    dateTo: number | null;
  };
  guests?: Partial<RoomGuestsFirebase>;
  priceRange?: [number, number];
  rules?: Partial<RoomRules>;
  availabilities?: Partial<RoomAvailabilities>;
  conveniences?: Partial<RoomConveniencesFirebase>;
  features?: RoomFeatures;
};

type RoomGuestsFirebase = {
  adults: number;
  kids: number;
  babies: number;
};

type RoomConveniencesFirebase = {
  bedrooms: number;
  beds: number;
  bathrooms: number;
};

type AllRooms = Record<string, Room> | null;

export type {
  RoomsStoreType,
  AllRooms,
  Room,
  RoomsFilter,
  RoomsFilterFirebase,
  RoomConveniences,
  RoomBooked,
  RoomGuests,
  RoomReview,
  RoomGuestsFirebase,
  RoomConveniencesFirebase,
};
