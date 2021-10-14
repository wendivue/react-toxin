import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { SelectionCard } from '@/SelectionCard';

import styles from './Banner.module.scss';

const Banner: FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.form}>
          <SelectionCard />
        </div>
        <div className={styles.caption}>{t('landingDescription')}</div>
      </div>
    </div>
  );
};

export { Banner };
