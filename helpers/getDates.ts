import { RoomsFilter } from 'storeMobX/rooms/roomsTypes';

export type GetDatesType = {
  dateFrom: number | null;
  dateTo: number | null;
};

const getDates = (filterFromState: RoomsFilter | null): GetDatesType => {
  if (!filterFromState || !filterFromState.dates) {
    return {
      dateFrom: null,
      dateTo: null,
    };
  }
  return {
    dateFrom: filterFromState.dates.dateFrom,
    dateTo: filterFromState.dates.dateTo,
  };
};

export { getDates };
