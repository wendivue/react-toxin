import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

import { BookingsFilterSwitchProps } from './types';
import classes from './BookingsFilterSwitch.module.scss';

const BookingsFilterSwitch: React.FC<BookingsFilterSwitchProps> = ({
  currentFilter,
  onChange,
}) => {
  const { t } = useTranslation('booking');

  const filterTexts = {
    all: t('all'),
    current: t('current'),
    confirmed: t('confirmed'),
    notConfirmed: t('notConfirmed'),
  };

  return (
    <div className={classes.bookingsFilterSwitch}>
      {(
        Object.entries(filterTexts) as Array<[keyof typeof filterTexts, string]>
      ).map(([type, text]) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={clsx(
            classes.button,
            type === currentFilter && classes.buttonActive,
          )}
          type="button"
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export { BookingsFilterSwitch };
