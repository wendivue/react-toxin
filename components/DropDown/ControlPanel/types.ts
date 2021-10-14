import { Update } from '../types';

type ControlPanelProps = {
  text: string;
  action: (props: Update) => void;
  keyName: string | number;
  count?: number;
  max?: number;
  isDisabled?: boolean;
};

export type { ControlPanelProps };
