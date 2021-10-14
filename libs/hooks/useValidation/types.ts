type UseValidationValues = {
  isEmpty: boolean;
  isEmailError: boolean;
  isPasswordError: boolean;
  isBirthDateError: boolean;
  isMinLengthError: boolean;
  isMaxLengthError: boolean;
  isUserNameError: boolean;
  isInputValid: boolean;
};

type FormValidationType = string;

type UseValidationParams = (
  value: string,
  validations: { [key: string]: boolean | number },
) => UseValidationValues;

export type { UseValidationParams, UseValidationValues, FormValidationType };
