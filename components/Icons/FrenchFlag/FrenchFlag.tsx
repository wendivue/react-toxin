import React from 'react';

import styles from './FrenchFlag.module.scss';

const FrenchFlag: React.FC = () => (
  <svg
    className={styles.FrenchFlag}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 9 6"
    width="900"
    height="600"
  >
    <rect width="9" height="6" fill="#ED2939" />
    <rect width="6" height="6" fill="#fff" />
    <rect width="3" height="6" fill="#002395" />
  </svg>
);

export { FrenchFlag };
