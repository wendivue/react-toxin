import { Moment } from 'moment';

type DropdownDateProps = {
  startValue: Date | null;
  endValue: Date | null;
  setFrom: (value: Date | null) => void;
  setTo: (value: Date | null) => void;
  onClear: () => void;
  isSingleInput?: boolean;
  isInlineCalendar?: boolean;
  startLabelText?: string;
  endLabelText?: string;
};

type DatesChangeValues = {
  startDate: Moment | null;
  endDate: Moment | null;
};

export type { DropdownDateProps, DatesChangeValues };
