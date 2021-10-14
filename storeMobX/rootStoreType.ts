import type { AuthType } from 'storeMobX/auth/authTypes';
import type { RoomsStoreType } from './rooms/roomsTypes';
import type { BookingStoreType } from './booking/bookingTypes';
import type { SubscriptionType } from './subscription/subscriptionTypes';
import { RoomType } from './room/roomTypes';

type RootStoreType = {
  authStore: AuthType;
  roomStore: RoomType;
  roomsStore: RoomsStoreType;
  subscriptionStore: SubscriptionType;
  bookingStore: BookingStoreType;
};

export type { RootStoreType };
