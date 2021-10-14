import React, { FC, useRef } from 'react';
import clsx from 'clsx';

import styles from './ControlPanel.module.scss';
import type { ControlPanelProps } from './types';

const ControlPanel: FC<ControlPanelProps> = ({
  text,
  count = 0,
  action,
  keyName,
  max = 0,
  isDisabled = false,
}) => {
  const initialTextRef = useRef<string>(text);
  const handleDecreaseValue = (): void => {
    if (isDisabled) return;
    if (count <= 0) {
      return;
    }
    action({ value: count - 1, key: keyName });
  };

  const handleIncreaseValue = (): void => {
    if (isDisabled) return;
    const isMax = max !== 0 && count >= max;
    if (isMax) return;
    action({ value: count + 1, key: keyName });
  };

  return (
    <div className={styles.item}>
      <span className={styles.itemSpan}>{initialTextRef.current}</span>
      <div className={styles.controlPanel}>
        <button
          type="button"
          className={clsx(
            styles.button,
            isDisabled && styles.buttonDisabled,
            count <= 0 && styles.buttonDisabled,
          )}
          onClick={handleDecreaseValue}
        >
          -
        </button>
        <div className={styles.span}>{count}</div>
        <button
          type="button"
          className={clsx(
            styles.button,
            isDisabled && styles.buttonDisabled,
            max !== 0 && count >= max && styles.buttonDisabled,
          )}
          onClick={handleIncreaseValue}
        >
          +
        </button>
      </div>
    </div>
  );
};

export { ControlPanel };
