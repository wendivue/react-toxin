type SliderValues = [number, number];

type PriceRangeProps = {
  title: string;
  values: SliderValues;
  onChange: (values: SliderValues) => void;
  min?: number;
  max?: number;
  step?: number;
};

export type { SliderValues, PriceRangeProps };
