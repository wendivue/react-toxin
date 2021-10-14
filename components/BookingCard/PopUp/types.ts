import { AdditionalServices } from 'store/booking/bookingTypes';
import { RoomGuestsFirebase } from 'store/rooms/roomsTypes';

import { Timestamp } from '@/libs/Firebase/Firebase';

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
