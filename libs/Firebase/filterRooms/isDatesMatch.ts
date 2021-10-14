import { dateFromJSON } from 'helpers/timestampJSONFormatter';
import { RoomBooked } from 'storeMobX/rooms/roomsTypes';

const isDatesMatch = (
  roomBooked: RoomBooked | undefined,
  filterDates: { dateFrom: number | null; dateTo: number | null },
): boolean => {
  if (!filterDates.dateFrom || !filterDates.dateTo) {
    return false;
  }

  let isMatch = true;

  if (roomBooked) {
    Object.values(roomBooked).forEach((userRoomBooked) => {
      Object.values(userRoomBooked).forEach((bookedDates) => {
        const firstFilterTime =
          filterDates.dateFrom === null ? 0 : filterDates.dateFrom;
        const secondFilterTime =
          filterDates.dateTo === null ? 0 : filterDates.dateTo;
        const firstBookedTime = new Date(
          dateFromJSON(bookedDates.dateFrom).toDate(),
        ).getTime();
        const secondBookedTime = new Date(
          dateFromJSON(bookedDates.dateTo).toDate(),
        ).getTime();
        const isFirstFilterTimeNotInBookedRange =
          firstFilterTime < firstBookedTime ||
          firstFilterTime > secondBookedTime;
        const isSecondFilterTimeNotInBookedRange =
          secondFilterTime < firstBookedTime ||
          secondFilterTime > secondBookedTime;
        const isSecondBookedTimeInRangeFilter =
          secondBookedTime < secondFilterTime &&
          secondBookedTime > firstFilterTime;
        const isFirstBookedTimeInRangeFilter =
          firstBookedTime > firstFilterTime &&
          firstBookedTime < secondFilterTime;

        isMatch =
          isMatch &&
          isFirstFilterTimeNotInBookedRange &&
          isSecondFilterTimeNotInBookedRange &&
          !isSecondBookedTimeInRangeFilter &&
          !isFirstBookedTimeInRangeFilter;
      });
    });
  }

  return isMatch;
};

export { isDatesMatch };
