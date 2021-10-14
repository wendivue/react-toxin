import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

import { RoomInfoProps } from './types';
import styles from './RoomInfo.module.scss';
import { roomParamsList } from './fixture';

const RoomInfo = ({ params, title }: RoomInfoProps): JSX.Element => {
  const { t } = useTranslation('roomInfo');

  return (
    <div className={styles.roomInfo}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.itemsList}>
        {params.map((item, index) => {
          if (index <= 1 || params.length === 3) {
            return (
              <li className={styles.itemWrapper} key={item}>
                <div className={styles.item}>
                  <i className={styles.icon}>{roomParamsList[item].icon}</i>
                  <div className={styles.textWrapper}>
                    <span className={styles.iconTitle}>
                      {t(`${item}.title`)}
                    </span>
                    <span className={styles.description}>
                      {t(`${item}.description`)}
                    </span>
                  </div>
                </div>
                {params.length - 1 !== index && <div className={styles.line} />}
              </li>
            );
          }
          return (
            <li className={clsx(styles.itemPopup)} key={item}>
              <div className={styles.itemIcon}>
                <i className={clsx(styles.icon, styles.iconSmall)}>
                  {roomParamsList[item].icon}
                </i>
              </div>

              <div className={styles.popup}>
                <div className={styles.infoPopup}>
                  <i className={styles.icon}>{roomParamsList[item].icon}</i>
                  <div className={styles.textWrapper}>
                    <span className={styles.iconTitle}>
                      {t(`${item}.title`)}
                    </span>
                    <span className={styles.description}>
                      {t(`${item}.description`)}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { RoomInfo };
