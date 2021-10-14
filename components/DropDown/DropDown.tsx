import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';

import { Animation } from '@/Animation';
import { Button } from '@/Button';
import { ControlPanel } from '@/DropDown/ControlPanel';

import styles from './DropDown.module.scss';
import type {
  DropDownProps,
  KeyValue,
  Naming,
  RenderChild,
  Update,
} from './types';

const DropDown: FC<DropDownProps> = ({
  title,
  active = false,
  items,
  naming,
  isTumbler = true,
  combineValues,
  onChange,
  textDefault = '',
}) => {
  const { t } = useTranslation('common');

  const [isActive, setIsActive] = useState(active);
  const [currentText, setCurrentText] = useState('');

  const namingRef = useRef<Naming>(naming || {});
  const dropRef = useRef<HTMLDivElement>(null);

  const keys = Object.keys(items);

  const changeCurrentText = useCallback(
    (text: string): void => {
      setCurrentText(text);

      if (!text) {
        setCurrentText(textDefault);
      }
    },
    [textDefault],
  );

  const onClickUpdateDropItems = ({ value, key }: Update): void => {
    if (onChange) {
      onChange({
        ...items,
        [key]: {
          ...items[key],
          value,
        },
      });
    }
  };

  const childElement = keys.map((el) => {
    return (
      <ControlPanel
        key={el}
        keyName={el}
        text={items[el].name}
        action={onClickUpdateDropItems}
        count={items[el].value}
        max={items[el].maxValue}
        isDisabled={items[el].isDisabled}
      />
    );
  });

  const handlerDocument = useCallback((e: MouseEvent) => {
    let isHave = false;
    if (dropRef.current) {
      isHave = e.composedPath().includes(dropRef.current);
    }

    if (!isHave) {
      setIsActive(false);
    }
  }, []);

  const getCurrentText = (obj: Naming, keyVal: KeyValue): string[] => {
    let textCurrent: string[] = [];

    Object.keys(obj).forEach((key) => {
      const keyToVariable = Object.keys(obj[key])
        .sort((a, b) => Number(b) - Number(a))
        .find((el) => {
          if (keyVal[key] <= 20) {
            return Number(el) <= keyVal[key];
          }

          const remainder = keyVal[key] % 10 || 5;

          return Number(el) <= remainder;
        });

      if (keyToVariable) {
        textCurrent = [
          ...textCurrent,
          `${keyVal[key]}  ${obj[key][keyToVariable]}`,
        ];
      }
    });
    return textCurrent;
  };

  const onClickCloseDrop = (): void => {
    setIsActive((act) => !act);
  };

  const onClickResetValue = (): void => {
    if (onChange) {
      const emptyItems: RenderChild = {};
      Object.keys(items).forEach((itemKey) => {
        emptyItems[itemKey] = { ...items[itemKey], value: 0 };
      });
      onChange(emptyItems);
    }
  };

  useEffect(() => {
    if (!naming) {
      let allItems: Array<{ name: string; value: number }>;
      if (combineValues) {
        const separateItems: Array<{ name: string; value: number }> = [];
        let combinedItemsSum = 0;

        Object.keys(items).forEach((itemKey) => {
          let shouldBeSeparate = true;
          combineValues.itemKeys.forEach((itemForCombineKey) => {
            if (itemForCombineKey === itemKey) {
              combinedItemsSum += items[itemForCombineKey].value;
              shouldBeSeparate = false;
            }
          });

          if (shouldBeSeparate) {
            separateItems.push({
              ...items[itemKey],
            });
          }
        });

        allItems = [
          {
            name: combineValues.name,
            value: combinedItemsSum,
          },
          ...separateItems,
        ];
      } else {
        allItems = Object.values(items).map((item) => ({
          ...item,
        }));
      }

      const result = allItems.map((item) => {
        return item.value <= 0 ? null : `${item.value}  ${item.name}`;
      });
      changeCurrentText(result.filter((el) => el != null).join(', '));
    } else {
      let textCurrent: string[] = [];
      const myVal: KeyValue = {};

      keys.map((el) => {
        const key: string = items[el].for || 'missingKey';
        const add = myVal[key] || 0;
        myVal[key] = add + items[el].value;

        return namingRef.current[key];
      });

      textCurrent = getCurrentText(namingRef.current, myVal);

      changeCurrentText(textCurrent.filter((el) => el != null).join(', '));
    }
  }, [items]);

  useEffect(() => {
    document.addEventListener('click', handlerDocument);
    return () => {
      document.removeEventListener('click', handlerDocument);
    };
  }, [handlerDocument]);

  return (
    <div ref={dropRef} className={styles.dropdown}>
      {title && <div className={styles.title}>{title}</div>}
      <div
        className={clsx(
          styles.select,
          isActive && styles.selectActive,
          isTumbler && styles.selectExtended,
        )}
      >
        <div
          onClick={onClickCloseDrop}
          role="button"
          tabIndex={0}
          onKeyDown={onClickCloseDrop}
          className={styles.current}
        >
          <div className={styles.text}>{currentText}</div>
          <div className={styles.icon}>expand_more</div>
        </div>
        <Animation tumbler={isActive}>
          <div className={styles.items}>
            {childElement}
            {isTumbler && (
              <div className={styles.buttons}>
                <div className={styles.buttonWrapper}>
                  <Button onButtonClick={onClickResetValue} text={t('clear')} />
                </div>
                <div className={styles.buttonWrapper}>
                  <Button onButtonClick={onClickCloseDrop} text={t('apply')} />
                </div>
              </div>
            )}
          </div>
        </Animation>
      </div>
    </div>
  );
};

export { DropDown };
