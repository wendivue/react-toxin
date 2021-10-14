import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './RoomRulesCard.module.scss';
import { RoomRulesProps } from './types';

const RoomRulesCard = ({ rules }: RoomRulesProps): JSX.Element => {
  const { t } = useTranslation('roomInfo');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('rules')}</h2>
      <ul className={styles.rulesList}>
        {Object.entries(rules).map((item) => {
          const [name, valid] = item;
          return (
            <li className={styles.item} key={name}>
              {t(`rulesList.${name}.${valid}`)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { RoomRulesCard };
