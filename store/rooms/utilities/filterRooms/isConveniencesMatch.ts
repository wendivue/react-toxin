import { RoomConveniences } from '../../roomsTypes';

const isConveniencesMath = (
  roomConveniences: RoomConveniences,
  filterConveniences: Partial<RoomConveniences>,
): boolean => {
  let isMatch = true;

  const { bedrooms, beds, bathrooms } = filterConveniences;

  if (bedrooms?.value) {
    isMatch = isMatch && Boolean(bedrooms.value <= roomConveniences.bedrooms);
  }
  if (beds?.value) {
    isMatch = isMatch && Boolean(beds.value <= roomConveniences.beds);
  }
  if (bathrooms?.value) {
    isMatch = isMatch && Boolean(bathrooms.value <= roomConveniences.bathrooms);
  }

  return isMatch;
};

export { isConveniencesMath };
