import React from 'react';
import clsx from 'clsx';

import classes from './Backdrop.module.scss';

const Backdrop: React.FC<{ onClick?: () => void; color?: 'light' | 'dark' }> =
  ({ onClick, color = 'dark' }) => (
    <div
      role="presentation"
      onClick={onClick}
      className={clsx(
        classes.backdrop,
        color === 'light' ? classes.backdropLight : classes.backdropDark,
        onClick && classes.backdropClickable,
      )}
    />
  );

export { Backdrop };
