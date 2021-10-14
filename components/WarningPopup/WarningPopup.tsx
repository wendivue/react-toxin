import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

import { Button } from '@/Button';

import styles from './WarningPopup.module.scss';
import { WarningPopupProps } from './types';

const WarningPopup = ({
  isShow = false,
  text,
  onClick,
}: WarningPopupProps): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <div
      className={clsx(
        styles.modal,
        isShow ? styles.modalShow : styles.modalClose,
      )}
    >
      <div className={styles.content}>
        <span>{text || t('somethingWentWrong')}</span>
        <span>{t('tryAgain')}</span>
        <div className={styles.buttonWrapper}>
          <Button
            text={t('continue')}
            theme="filled"
            color="white"
            size="s"
            onButtonClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export { WarningPopup };
