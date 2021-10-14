import React from 'react';

import { DropdownDateNavigationProps } from './types';
import styles from './DropdownDateNavigation.module.scss';

const DropdownDateNavigation = (
  props: DropdownDateNavigationProps,
): JSX.Element => {
  const { isForwardArrow } = props;

  return (
    <>
      {isForwardArrow ? (
        <span className={`${styles.navButton} ${styles.navButtonForward}`}>
          arrow_forward
        </span>
      ) : (
        <span className={`${styles.navButton} ${styles.navButtonBack}`}>
          arrow_back
        </span>
      )}
    </>
  );
};

export { DropdownDateNavigation };
