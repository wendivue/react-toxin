type RadioButtonsTypes = {
  name: string;
  items: string[];
  checkedItem: number;
  onChange: (checkedItem: 0 | 1) => void;
  title?: string;
};

export type { RadioButtonsTypes };
