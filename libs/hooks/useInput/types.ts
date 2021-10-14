import { UseValidationValues } from '../useValidation/types';

type UseInputValue = UseValidationValues & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  isVisited: boolean;
};

type UseInputProps = (
  initialValue: string,
  validations: { [key: string]: boolean | number },
) => UseInputValue;

export type { UseInputProps };
