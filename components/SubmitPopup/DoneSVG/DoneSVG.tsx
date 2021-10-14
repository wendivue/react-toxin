import React, { FC } from 'react';

import styles from './DoneSVG.module.scss';

const DoneSVG: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="url(#lgrad1)"
    className={styles.done}
  >
    <linearGradient id="lgrad1" x1="50%" y1="100%" x2="50%" y2="0%">
      <stop offset="0%" stopColor="rgb(111,207,151)" stopOpacity="1" />
      <stop offset="100%" stopColor="rgb(102,210,234)" stopOpacity="1" />
    </linearGradient>
    {/* eslint-disable-next-line max-len */}
    <path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z " />
    <circle
      fill="none"
      cx="12"
      cy="12"
      r="9"
      stroke="url(#lgrad1)"
      strokeDasharray="50.8938009882 5.65486677646"
      strokeDashoffset="2.82743338823"
      strokeWidth="2px"
      className={styles.circle}
    />
  </svg>
);

export { DoneSVG };
