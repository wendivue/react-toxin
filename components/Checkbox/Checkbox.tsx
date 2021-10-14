import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { CheckboxItem } from './CheckboxItem';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from './types';

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const {
    items,
    title,
    onChange,
    isExpand,
    isOpen = false,
    name = 'checkbox',
  } = props;
  const initialState = items.map((item) => item.isChecked || false);
  const [isOpenState, setOpenState] = useState(isOpen);
  const [itemsValues, setItemsValues] = useState(initialState);

  const handleCheckboxChange = (value: number): void => {
    const newItemsValues = itemsValues.map((item, index) =>
      index === value ? !item : item,
    );
    setItemsValues(newItemsValues);
    onChange(newItemsValues);
  };

  const handleButtonClick = (): void => {
    setOpenState((prev) => !prev);
  };

  useEffect(() => {
    const isChange = initialState.some(
      (item, index) => item !== itemsValues[index],
    );
    if (isChange) {
      setItemsValues(initialState);
    }
  }, [initialState, itemsValues]);

  return (
    <div className={styles.wrapper}>
      {isExpand ? (
        <button
          className={clsx(styles.title, styles.titleButton)}
          type="button"
          onClick={handleButtonClick}
        >
          {title}
          <span className={clsx(styles.icon, isOpenState && styles.iconActive)}>
            expand_less
          </span>
        </button>
      ) : (
        <p className={styles.title}>{title}</p>
      )}
      <ul
        className={clsx(
          styles.list,
          isOpenState && styles.listOpen,
          isExpand && styles.listExpand,
        )}
      >
        {items.map((item, index) => (
          <li className={styles.item} key={item.id}>
            <CheckboxItem
              label={item.label}
              value={index}
              addition={item.addition}
              name={name}
              isChecked={itemsValues[index]}
              onChange={handleCheckboxChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Checkbox };
