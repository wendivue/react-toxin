import { RoomGuestsFirebase } from 'storeMobX/rooms/roomsTypes';

const isGuestsMatch = (
  roomGuests: { adults: number; kids: number; babies: number },
  filterGuests: Partial<RoomGuestsFirebase>,
): boolean => {
  let isMatch = true;

  if (filterGuests.babies) {
    isMatch = isMatch && filterGuests.babies <= roomGuests.babies;
  }

  const adults = filterGuests.adults || 0;
  const kids = filterGuests.kids || 0;
  isMatch = isMatch && adults + kids <= roomGuests.adults + roomGuests.kids;

  return isMatch;
};

export { isGuestsMatch };
