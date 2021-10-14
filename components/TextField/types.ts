type TextFieldProps = {
  type: 'email' | 'text' | 'password';
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  placeholder?: string;
  isWithMask?: boolean;
  isActive?: boolean;
  isSubscribe?: boolean;
  isDisabled?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export type { TextFieldProps };
