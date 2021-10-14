type ItemsCheckboxProps = {
  id: number;
  label: string;
  isChecked?: boolean;
  addition?: string;
}[];

type CheckboxProps = {
  items: ItemsCheckboxProps;
  title: string;
  onChange: (value: boolean[]) => void;
  isExpand?: boolean;
  isOpen?: boolean;
  name?: string;
};

export type { CheckboxProps, ItemsCheckboxProps };
