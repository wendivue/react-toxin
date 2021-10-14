import { ItemsCheckboxProps } from '@/Checkbox/types';

type CheckboxesInfo = {
  items: ItemsCheckboxProps;
  title: string;
  isExpand: boolean;
  name: string;
};

type SetCheckboxValues = (checkboxes: Array<boolean>) => void;

type UseCheckboxes = (
  checkboxesType: 'rules' | 'availabilities' | 'features',
) => [CheckboxesInfo, SetCheckboxValues];

export type { UseCheckboxes, SetCheckboxValues };
