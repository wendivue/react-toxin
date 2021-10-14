type Keys =
  | 'noiseAbsorbingWalls'
  | 'windowsInBedrooms'
  | 'fireplace'
  | 'fridge'
  | 'table'
  | 'iron'
  | 'television'
  | 'balcony'
  | 'fan'
  | 'gym'
  | 'rockingChair'
  | 'jacuzzi'
  | 'feedingChair'
  | 'cot'
  | 'shampoo'
  | 'breakfast';

type RoomInfoProps = {
  params: Array<Keys>;
  title?: string;
};

type ParamsList = {
  [key: string]: {
    icon: string;
    iconTitle: string;
    description: string;
  };
};

export type { RoomInfoProps, ParamsList, Keys };
