import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

import styles from './DropdownDateInput.module.scss';
import { DropdownDateInputProps } from './types';

const DropdownDateInput = React.forwardRef(
  (
    props: DropdownDateInputProps,
    ref: React.Ref<HTMLDivElement>,
  ): JSX.Element => {
    const {
      onInputClick,
      startLabelText,
      endLabelText,
      isSingleInput,
      dateRangeString,
      startDateString,
      endDateString,
    } = props;

    const { t } = useTranslation('common');

    return (
      <>
        <div
          className={clsx(
            styles.inputWrapper,
            !isSingleInput && styles.inputWrapperDouble,
          )}
          ref={ref}
        >
          <label className={styles.label}>
            <span>{startLabelText}</span>
            <input
              type="text"
              name="start date"
              value={`${isSingleInput ? dateRangeString : startDateString}`}
              readOnly
              placeholder={t('dateStructureFull')}
              onClick={onInputClick}
              className={clsx(
                styles.dateInput,
                !isSingleInput && styles.dateInputSmall,
              )}
            />
          </label>

          {!isSingleInput && (
            <label className={styles.label}>
              <span>{endLabelText}</span>
              <input
                type="text"
                name="end date"
                value={`${endDateString}`}
                readOnly
                placeholder={t('dateStructureFull')}
                onClick={onInputClick}
                className={clsx(
                  styles.dateInput,
                  !isSingleInput && styles.dateInputSmall,
                )}
              />
            </label>
          )}
        </div>
      </>
    );
  },
);

export { DropdownDateInput };
