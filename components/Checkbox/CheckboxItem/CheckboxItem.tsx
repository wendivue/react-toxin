import React from 'react';
import clsx from 'clsx';

import styles from './CheckboxItem.module.scss';
import { CheckboxItemProps } from './types';

const CheckboxItem = (props: CheckboxItemProps): JSX.Element => {
  const { label, value, isChecked, onChange, addition, name } = props;
  const handleInputClick = (): void => {
    onChange(value);
  };

  return (
    <label
      className={clsx(
        styles.label,
        isChecked && styles.labelChecked,
        addition && styles.labelAddition,
      )}
    >
      {label}
      {addition && <span className={styles.addition}>{addition}</span>}
      <input
        className={styles.input}
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleInputClick}
      />
    </label>
  );
};

export { CheckboxItem };
