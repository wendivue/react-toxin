import React, { FC } from 'react';

import styles from './ValidationCircle.module.scss';
import { ValidationCircleProps } from './type';

const ValidationCircle: FC<ValidationCircleProps> = ({ value }) => {
  const quantityToShow = 30;

  const difference = 500 - value;
  const dash = 0.25132741228 * difference;
  const ln = 0.25132741228 * value;
  const color = { purple: '#BC9CFF', green: '#6FCF97', red: '#bd2323' };
  let fillColor = color.purple;
  if (difference <= quantityToShow) {
    fillColor = color.green;
  }
  if (difference === 0) {
    fillColor = color.red;
  }
  return (
    <>
      <svg width="100%" height="100%" viewBox="0 0 44 44">
        <circle
          className={styles.circleDefault}
          cx="22"
          cy="22"
          r="20"
          fill="none"
          strokeWidth={4}
        />
        <g fill={fillColor} stroke={fillColor}>
          <text
            textAnchor="middle"
            className={styles.text}
            x="22"
            y="26"
            stroke="none"
          >
            {difference <= quantityToShow ? difference : ''}
          </text>
          <circle
            cx="22"
            cy="22"
            r="20"
            fill="none"
            strokeWidth={4}
            strokeDasharray={`${ln} ${dash}`}
            strokeDashoffset="31.4159265359"
          />
        </g>
      </svg>
    </>
  );
};

export { ValidationCircle };
