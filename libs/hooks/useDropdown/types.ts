type SetDropdownItems = (
  values: Record<
    string,
    {
      value?: number;
      maxValue?: number;
      isDisabled?: boolean;
    }
  >,
) => void;

type DropdownItem = {
  name: string;
  value: number;
  maxValue?: number;
  isDisabled?: boolean;
};

type DropdownInfo = {
  title: string;
  textDefault: string;
  items: Record<string, DropdownItem>;
  combineValues?: { name: string; itemKeys: Array<string> };
  isTumbler: boolean;
};

type UseDropdown = (
  category: 'rooms' | 'guests',
  initialItems?: Record<
    string,
    {
      value: number;
      maxValue?: number;
      isDisabled?: boolean;
    }
  >,
) => [DropdownInfo, SetDropdownItems];

export type { UseDropdown, SetDropdownItems, DropdownItem, DropdownInfo };
