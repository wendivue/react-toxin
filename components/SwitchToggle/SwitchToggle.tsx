import React, { FC } from 'react';

import styles from './SwitchToggle.module.scss';
import { SwitchToggleProps } from './types';

const SwitchToggle: FC<SwitchToggleProps> = ({
  label,
  title,
  check = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.checked);
  };

  return (
    <>
      {title && <div className={styles.title}>{title}</div>}
      <label className={styles.toggle}>
        <input
          className={styles.input}
          type="checkbox"
          checked={check}
          onChange={handleChange}
        />
        <span className={styles.span}>{label}</span>
      </label>
    </>
  );
};

export { SwitchToggle };
