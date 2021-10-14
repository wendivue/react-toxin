import React, { FC } from 'react';

import styles from './RadioButtons.module.scss';
import { RadioButtonsTypes } from './types';

const RadioButtons: FC<RadioButtonsTypes> = ({
  name,
  items,
  checkedItem,
  title,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(Number(e.target.value) as 0 | 1);
  };

  const radioButtons = items.map((el, i) => {
    return (
      <label className={styles.label} key={el}>
        <input
          className={styles.input}
          type="radio"
          name={name}
          checked={checkedItem === i}
          value={i}
          onChange={handleChange}
        />
        <span className={styles.span}>{el}</span>
      </label>
    );
  });

  return (
    <div className={styles.radio}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.items}>{radioButtons}</div>
    </div>
  );
};

export { RadioButtons };
