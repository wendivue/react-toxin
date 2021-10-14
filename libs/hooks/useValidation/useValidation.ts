import { useEffect, useState } from 'react';

import { FormValidationType, UseValidationParams } from './types';

const useValidation: UseValidationParams = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const [isBirthDateError, setBirthDateError] = useState(false);
  const [isInputValid, setInputValid] = useState(false);
  const [isMinLengthError, setMinLengthError] = useState(false);
  const [isMaxLengthError, setMaxLengthError] = useState(false);
  const [isUserNameError, setUserNameError] = useState(false);

  useEffect(() => {
    const validateEmpty = (): void => {
      value ? setEmpty(false) : setEmpty(true);
    };

    const validateMinLength = (): void => {
      value.length < validations.minLength
        ? setMinLengthError(true)
        : setMinLengthError(false);
    };

    const validateMaxLength = (): void => {
      value.length > validations.maxLength
        ? setMaxLengthError(true)
        : setMaxLengthError(false);
    };

    const validateEmail = (): void => {
      const reEmail =
        /* eslint-disable-next-line */
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      reEmail.test(String(value).toLowerCase())
        ? setEmailError(false)
        : setEmailError(true);
    };

    const validatePassword = (): void => {
      const rePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      rePassword.test(String(value))
        ? setPasswordError(false)
        : setPasswordError(true);
    };

    const checkMinAge = (birthDate: Date): boolean => {
      const val = new Date(
        birthDate.getFullYear() + 18,
        birthDate.getMonth(),
        birthDate.getDate(),
      );
      return val <= new Date();
    };

    const validateBirthDate = (): void => {
      const userDate = value.split('.');
      const newUserDate = new Date(
        `${userDate[1]}/${userDate[0]}/${userDate[2]}`,
      );
      const reDate = /(\d{2})\.(\d{2})\.(\d{4})/;
      setEmpty(() => false);
      if (reDate.test(String(value))) {
        checkMinAge(newUserDate)
          ? setBirthDateError(false)
          : setBirthDateError(true);
      } else {
        setBirthDateError(true);
      }
    };

    const validateUserName = (): void => {
      const reUserName = /^[^/\\/&+:;=*#%$!?|,.@<>$[\]{}]*$/;
      reUserName.test(value) ? setUserNameError(false) : setUserNameError(true);
    };

    const mapFormValidationTypeFunction: Record<
      FormValidationType,
      () => void
    > = {
      minLength: validateMinLength,
      maxLength: validateMaxLength,
      isEmpty: validateEmpty,
      isEmail: validateEmail,
      isPassword: validatePassword,
      isBirthDate: validateBirthDate,
      isUserName: validateUserName,
    };

    Object.keys(validations).forEach((validation) => {
      if (mapFormValidationTypeFunction[validation]) {
        mapFormValidationTypeFunction[validation]();
      }
    });
  }, [value, validations]);

  useEffect(() => {
    const isFieldHasError =
      isEmpty ||
      isEmailError ||
      isPasswordError ||
      isBirthDateError ||
      isMinLengthError ||
      isMaxLengthError ||
      isUserNameError;

    isFieldHasError ? setInputValid(false) : setInputValid(true);
  }, [
    isEmpty,
    isEmailError,
    isPasswordError,
    isBirthDateError,
    isMinLengthError,
    isMaxLengthError,
    isUserNameError,
  ]);

  return {
    isEmpty,
    isEmailError,
    isPasswordError,
    isBirthDateError,
    isMinLengthError,
    isMaxLengthError,
    isUserNameError,
    isInputValid,
  };
};

export { useValidation };
