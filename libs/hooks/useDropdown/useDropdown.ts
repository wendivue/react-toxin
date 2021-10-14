import { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

import type {
  DropdownItem,
  SetDropdownItems,
  UseDropdown,
  DropdownInfo,
} from './types';

const useDropdown: UseDropdown = (
  category: 'rooms' | 'guests',
  initialItems,
) => {
  const { t } = useTranslation('filter');

  const [items, setItems] = useState<Record<string, DropdownItem>>(
    category === 'guests'
      ? {
          adults: {
            name: t('adults', { count: 0 }),
            value: initialItems?.adults.value || 0,
            maxValue: initialItems?.adults.maxValue || 0,
          },
          kids: {
            name: t('kids', { count: 0 }),
            value: initialItems?.kids.value || 0,
            maxValue: 0,
          },
          babies: {
            name: t('babies', { count: 0 }),
            value: initialItems?.babies.value || 0,
            maxValue: 0,
          },
        }
      : {
          bedrooms: {
            name: t('bedrooms', { count: 0 }),
            value: initialItems?.bedrooms.value || 0,
            maxValue: 0,
          },
          beds: {
            name: t('beds', { count: 0 }),
            value: initialItems?.beds.value || 0,
            maxValue: 0,
          },
          bathrooms: {
            name: t('bathrooms', { count: 0 }),
            value: initialItems?.bathrooms.value || 0,
            maxValue: 0,
          },
        },
  );

  const getDropdownInfo = (
    currentItems: Record<string, DropdownItem>,
  ): DropdownInfo => ({
    title: category === 'guests' ? t('guests') : t('roomConveniences'),
    textDefault: category === 'guests' ? t('howManyGuests') : t('howManyRooms'),
    items: currentItems,
    combineValues:
      category === 'guests'
        ? {
            name: t('guests', {
              count: currentItems.adults.value + currentItems.kids.value,
            }),
            itemKeys: ['adults', 'kids'],
          }
        : undefined,
    isTumbler: category === 'guests',
  });

  const dropdownInfo = useRef(getDropdownInfo(items));

  const setDropdownItems: SetDropdownItems = (itemsToChange) => {
    setItems(() => {
      const updatedItems = { ...items };
      Object.keys(itemsToChange).forEach((key) => {
        updatedItems[key].value = itemsToChange[key].value || 0;
        updatedItems[key].name = t(key, {
          count: itemsToChange[key].value ?? items[key].value,
        });
        updatedItems[key].maxValue =
          itemsToChange[key].maxValue ?? updatedItems[key].maxValue;
        updatedItems[key].isDisabled =
          itemsToChange[key].isDisabled || updatedItems[key].isDisabled;
      });

      dropdownInfo.current = getDropdownInfo(updatedItems);
      return updatedItems;
    });
  };

  return [dropdownInfo.current, setDropdownItems];
};

export { useDropdown };
