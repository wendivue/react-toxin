import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { ItemsCheckboxProps } from '@/Checkbox/types';

import type { SetCheckboxValues, UseCheckboxes } from './types';

const useCheckboxes: UseCheckboxes = (checkboxesType) => {
  const { t } = useTranslation('filter');

  let initialItems: ItemsCheckboxProps;
  let title: string;

  if (checkboxesType === 'rules') {
    initialItems = [
      { id: 1, label: t('canSmoke') },
      { id: 2, label: t('canWithPets') },
      { id: 3, label: t('canWithGuests') },
    ];
    title = t('roomRules');
  } else if (checkboxesType === 'availabilities') {
    initialItems = [
      {
        id: 4,
        label: t('wideCorridor'),
        addition: t('minimumCorridorsWidth'),
      },
      {
        id: 5,
        label: t('assistantForDisabled'),
        addition: t('assistantWillMeetYou'),
      },
    ];
    title = t('availability');
  } else {
    initialItems = [
      { id: 6, label: t('breakfast') },
      { id: 7, label: t('desk') },
      { id: 8, label: t('feedingChair') },
      { id: 9, label: t('cot') },
      { id: 10, label: t('television') },
      { id: 11, label: t('shampoo') },
    ];
    title = t('additionalAmenities');
  }

  const [items, setItems] = useState<ItemsCheckboxProps>(initialItems);

  const setCheckboxValues: SetCheckboxValues = (checkboxValues) => {
    const newItems: ItemsCheckboxProps = [];

    checkboxValues.forEach((value, index) => {
      newItems[index] = {
        ...items[index],
        isChecked: value,
      };
    });

    setItems(newItems);
  };

  return [
    {
      items,
      title,
      isExpand: checkboxesType === 'features',
      name: 'checkbox',
    },
    setCheckboxValues,
  ];
};

export { useCheckboxes };
