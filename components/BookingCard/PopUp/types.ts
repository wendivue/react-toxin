import type { AdditionalServices } from 'storeMobX/booking/bookingTypes';
import { RoomGuestsFirebase } from 'storeMobX/rooms/roomsTypes';
import { Timestamp } from '@/libs/Firebase/types';

type PopUpProps = {
  pricePerDay: number;
  sale: number;
  type: string;
  totalPrice: number;
  roomNumber: number;
  additionalServices?: AdditionalServices;
  guest?: RoomGuestsFirebase;
  dateFrom?: Timestamp;
  dateTo?: Timestamp;
  onChange: () => void;
};

export type { PopUpProps };
