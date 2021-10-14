type CheckboxItemProps = {
  label: string;
  value: number;
  isChecked: boolean;
  onChange: (value: number) => void;
  name: string;
  addition?: string;
};

export type { CheckboxItemProps };
