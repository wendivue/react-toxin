import { RoomConveniencesFirebase } from 'storeMobX/rooms/roomsTypes';

const isConveniencesMath = (
  roomConveniences: RoomConveniencesFirebase,
  filterConveniences: Partial<RoomConveniencesFirebase>,
): boolean => {
  let isMatch = true;

  const { bedrooms, beds, bathrooms } = filterConveniences;

  if (bedrooms) {
    isMatch = isMatch && Boolean(bedrooms <= roomConveniences.bedrooms);
  }
  if (beds) {
    isMatch = isMatch && Boolean(beds <= roomConveniences.beds);
  }
  if (bathrooms) {
    isMatch = isMatch && Boolean(bathrooms <= roomConveniences.bathrooms);
  }

  return isMatch;
};

export { isConveniencesMath };
