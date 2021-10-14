import { RateButtonProps } from '@/RateButton/type';

type HotelCardProps = {
  item: HotelItemProps;
  onChange?: (value: number) => void;
};

type HotelItemProps = {
  sliderList: string[];
  descriptionList: DescriptionProps;
  link: string;
  starList?: RateButtonProps;
  review?: number;
  isLux?: boolean;
  currency?: string;
  period?: string;
};

type DescriptionProps = {
  roomNumber: number;
  price: number;
};

export type { HotelCardProps, DescriptionProps, HotelItemProps };
