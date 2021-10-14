import React, { FC, useEffect, useState } from 'react';

import styles from './RateButton.module.scss';
import { RateButtonProps } from './type';

const starIcon = 'star';
const starBorderIcon = 'star_border';

const RateButton: FC<RateButtonProps> = React.memo(
  ({ rating = 0, star = 5, disabled = true, onChange }) => {
    const [starsSelected, setSelectStar] = useState(Math.round(rating));
    useEffect(() => {
      if (onChange) {
        onChange(starsSelected);
      }
    }, [starsSelected]);

    return (
      <ul className={styles.list}>
        {[...Array(star)].map((_, index) => {
          const handleIncrease = (): void => setSelectStar(index + 1);

          return (
            <li key={index.toString()} className={styles.item}>
              <button
                className={styles.icon}
                onClick={handleIncrease}
                type="button"
                disabled={disabled}
              >
                {index < starsSelected ? starIcon : starBorderIcon}
              </button>
            </li>
          );
        })}
      </ul>
    );
  },
);

export { RateButton };
