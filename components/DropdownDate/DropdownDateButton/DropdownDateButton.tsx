import React from 'react';
import { useTranslation } from 'next-i18next';

import { Button } from '@/Button';

import styles from './DropdownDateButton.module.scss';
import { DropdownDateButtonProps } from './types';

const DropdownDateButton = (props: DropdownDateButtonProps): JSX.Element => {
  const { t } = useTranslation('common');
  const { onClearDate, onSetDate } = props;

  return (
    <div className={styles.buttonWrapper}>
      <div className={styles.buttonBlock}>
        <Button onButtonClick={onClearDate} text={t('clear')} />
      </div>
      <div className={styles.buttonBlock}>
        <Button onButtonClick={onSetDate} text={t('apply')} />
      </div>
    </div>
  );
};

export { DropdownDateButton };
