import { RoomGuests } from '../../roomsTypes';

const isGuestsMatch = (
  roomGuests: { adults: number; kids: number; babies: number },
  filterGuests: Partial<RoomGuests>,
): boolean => {
  let isMatch = true;

  if (filterGuests.babies?.value) {
    isMatch = isMatch && filterGuests.babies.value <= roomGuests.babies;
  }

  const adults = filterGuests.adults?.value || 0;
  const kids = filterGuests.kids?.value || 0;
  isMatch = isMatch && adults + kids <= roomGuests.adults + roomGuests.kids;

  return isMatch;
};

export { isGuestsMatch };
