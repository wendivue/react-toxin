import type { RootStoreType } from './rootStoreType';
import { Auth } from './auth/Auth';
import type { AuthType } from './auth/authTypes';
import { RoomsStore } from './rooms/RoomsStore';
import type { RoomsStoreType } from './rooms/roomsTypes';
import { BookingStore } from './booking/BookingStore';
import type { BookingStoreType } from './booking/bookingTypes';
import { RoomType } from './room/roomTypes';
import { RoomStore } from './room/RoomStore';
import { Subscription } from './subscription/Subscription';
import type { SubscriptionType } from './subscription/subscriptionTypes';

class RootStore implements RootStoreType {
  authStore: AuthType;

  roomsStore: RoomsStoreType;

  roomStore: RoomType;

  subscriptionStore: SubscriptionType;

  bookingStore: BookingStoreType;

  constructor() {
    this.authStore = new Auth(this);
    this.roomsStore = new RoomsStore(this);
    this.roomStore = new RoomStore(this);
    this.subscriptionStore = new Subscription(this);
    this.bookingStore = new BookingStore(this);
  }
}

export { RootStore };
