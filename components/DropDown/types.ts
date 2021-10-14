type DropDownProps = {
  items: RenderChild;
  textDefault?: string;
  title?: string | null;
  active?: boolean;
  isTumbler?: boolean;
  naming?: Naming;
  combineValues?: { name: string; itemKeys: Array<string> };
  onChange?: (dropItems: RenderChild) => void;
};
type RenderChild = {
  [key: string]: Item;
};
type Item = {
  name: string;
  value: number;
  maxValue?: number;
  for?: string;
  isDisabled?: boolean;
};
type Update = {
  value: number;
  key: string | number;
};
type Naming = {
  [key: string]: {
    [key: string]: string;
  };
};
type KeyValue = {
  [key: string]: number;
};
export type { DropDownProps, Update, Naming, RenderChild, KeyValue };
