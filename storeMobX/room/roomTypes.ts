import firebase from 'firebase/app';

type RoomType = {
  isLoadingRoomData: boolean;
  room: Room | null;
  roomError: RoomError | null;
  isLoadingBookingsData: boolean;
  bookings: RoomBooked | null;
  bookingsError: RoomError | null;
  isLoadingReview: boolean;
  reviews: RoomReview | null;
  reviewError: RoomError | null;
  fetchRoom(roomId: string): Generator;
  fetchRoomBooking(roomId: string): Generator;
  getReviews(roomId: {
    roomId: string;
  }): Generator<unknown, void, firebase.firestore.DocumentData>;
  setReview({
    roomId,
    text,
    date,
  }: {
    roomId: string;
    text: string;
    date: string;
  }): Generator<unknown, void, firebase.firestore.DocumentData>;
  deleteReview({
    roomId,
    reviewId,
  }: {
    roomId: string;
    reviewId: string;
  }): Generator<unknown, void, firebase.firestore.DocumentData>;
  changeReview({
    roomId,
    reviewId,
    likes,
    text,
  }: {
    roomId: string;
    reviewId: string;
    text?: string;
    likes?: number;
  }): Generator<unknown, void, firebase.firestore.DocumentData>;
};

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
type RoomError = firebase.firestore.FirestoreError | Error;

type RoomRules = {
  smoke: boolean;
  pets: boolean;
  guests: boolean;
  parties: boolean;
  isArrivalTimeLimited: boolean;
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

type RoomGuestsFirebase = {
  adults: number;
  kids: number;
  babies: number;
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
type RoomAvailabilities = {
  wideCorridor: boolean;
  helpForInvalids: boolean;
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

export type { Room, RoomType };
