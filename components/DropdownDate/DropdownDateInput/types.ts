type DropdownDateInputProps = {
  onInputClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  isSingleInput: boolean;
  startLabelText: string;
  endLabelText: string;
  dateRangeString: string;
  startDateString: string;
  endDateString: string;
};

export type { DropdownDateInputProps };
