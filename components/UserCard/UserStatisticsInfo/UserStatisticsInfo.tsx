import React from 'react';

import { pricePrettify } from 'helpers/pricePrettify';

import type { UserStatisticsInfoProps } from './types';
import classes from './UserStatisticsInfo.module.scss';

const UserStatisticsInfo: React.FC<UserStatisticsInfoProps> = ({
  statistics,
}) => (
  <div className={classes.userStatisticsInfo}>
    {Object.entries(statistics).map(([statisticKey, statistic]) => {
      return (
        <div key={statisticKey}>
          <h4 className={classes.statisticsTitle}>{statistic.title}</h4>
          <ul className={classes.statisticsItemsList}>
            {Object.entries(statistic.items).map(([itemKey, item]) => (
              <li key={itemKey} className={classes.statisticsItem}>
                <span>{item.title}</span>
                <span className={classes.statisticsItemValue}>
                  {pricePrettify(item.value)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    })}
  </div>
);

export { UserStatisticsInfo };
