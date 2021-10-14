import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';

import { pricePrettify } from 'helpers/pricePrettify';

import type { PriceRangeProps, SliderValues } from './types';
import classes from './PriceRange.module.scss';

const isSliderValues = (values: number | number[]): values is SliderValues =>
  Array.isArray(values) && values[0] !== undefined && values[1] !== undefined;

const PriceRange: React.FC<PriceRangeProps> = ({
  values,
  onChange,
  title,
  min = 0,
  max = 16000,
  step = 100,
}) => {
  const [firstValue, secondValue] = values;
  const [sliderValues, setSliderValues] = useState(values);

  const handleSliderChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    currentValues: number | number[],
  ): void => {
    if (isSliderValues(currentValues)) {
      setSliderValues(currentValues);
    }
  };

  const handleSliderChangeCommitted = (
    event: React.ChangeEvent<Record<string, unknown>>,
    currentValues: number | number[],
  ): void => {
    if (isSliderValues(currentValues)) {
      onChange(currentValues);
    }
  };

  useEffect(() => {
    const [fromCurrentValues, toCurrentValues] = sliderValues;
    const isSliderChanged =
      firstValue !== fromCurrentValues || secondValue !== toCurrentValues;
    if (isSliderChanged) {
      setSliderValues([firstValue, secondValue]);
    }
  }, [firstValue, secondValue]);

  return (
    <div className={classes.priceRange}>
      <div className={classes.info}>
        <h3 className={classes.title}>{title}</h3>
        <span className={classes.value}>
          {pricePrettify(sliderValues[0])} - {pricePrettify(sliderValues[1])}
        </span>
      </div>

      <Slider
        value={sliderValues}
        min={min}
        max={max}
        step={step}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeCommitted}
      />
    </div>
  );
};

export { PriceRange };
