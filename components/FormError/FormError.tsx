import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';

import { FormErrorKey, FormErrorProps } from './types';
import styles from './FormError.module.scss';

const FormErrors = ({ formError }: FormErrorProps): JSX.Element => {
  const { t } = useTranslation('auth');

  const [errorStr, setErrorSrt] = useState('');
  const [isHovered, setHovered] = useState(false);
  const [key] = Object.keys(formError);
  const [values] = Object.values(formError);
  const { empty, invalid, minLength, maxLength } = values;

  useEffect(() => {
    const handleUserNameErrors = (): void => {
      const maxStrLength = key === 'userName' ? '30' : '50';
      const minStrLength = 2;

      if (empty) {
        setErrorSrt(key === 'userName' ? t('enterName') : t('enterSurname'));
      } else if (maxLength) {
        setErrorSrt(
          key === 'userName'
            ? t('nameMustNotExceed', { numberOfCharacters: maxStrLength })
            : t('surnameMustNotExceed', { numberOfCharacters: maxStrLength }),
        );
      } else if (!empty && minLength) {
        setErrorSrt(
          key === 'userName'
            ? t('nameMustBeLonger', { numberOfCharacters: minStrLength })
            : t('surnameMustBeLonger', { numberOfCharacters: minStrLength }),
        );
      } else if (invalid) {
        setErrorSrt(t('invalidCharacters'));
      } else {
        setErrorSrt('');
      }
    };

    const handleEmailErrors = (): void => {
      if (empty) {
        setErrorSrt(t('enterEmail'));
      } else if (invalid) {
        setErrorSrt(t('incorrectEmail'));
      } else {
        setErrorSrt('');
      }
    };

    const handlePasswordErrors = (): void => {
      if (empty) {
        setErrorSrt(t('enterPassword'));
      } else if (invalid) {
        setErrorSrt(t('passwordMustBe'));
      } else {
        setErrorSrt('');
      }
    };

    const handleBirthDateErrors = (): void => {
      if (invalid && !minLength) {
        setErrorSrt(t('youAreUnder18'));
      } else if (minLength && invalid) {
        setErrorSrt(t('enterBirthdateInCorrectFormat'));
      } else if (empty || minLength) {
        setErrorSrt(t('enterBirthdate'));
      } else {
        setErrorSrt('');
      }
    };

    const handleAuthErrors = (): void => {
      if (invalid) {
        setErrorSrt(t('invalidUsernameOrPassword'));
      }
    };

    const handleRegistrationErrors = (): void => {
      if (invalid) {
        setErrorSrt(t('emailBusy'));
      }
    };

    const handlePasswordCopyErrors = (): void => {
      if (invalid) {
        setErrorSrt('Пароли должны совпадать');
      }
    };

    const handleChangePasswordErrors = (): void => {
      if (invalid) {
        setErrorSrt('Вы ввели неверный пароль');
      }
    };

    const mapFormErrorToHandleErrorFunction: Record<FormErrorKey, () => void> =
      {
        userName: handleUserNameErrors,
        userSurname: handleUserNameErrors,
        email: handleEmailErrors,
        password: handlePasswordErrors,
        birthDate: handleBirthDateErrors,
        auth: handleAuthErrors,
        registration: handleRegistrationErrors,
        passwordCopy: handlePasswordCopyErrors,
        changePassword: handleChangePasswordErrors,
      };

    if (mapFormErrorToHandleErrorFunction[key]) {
      mapFormErrorToHandleErrorFunction[key]();
    } else {
      setErrorSrt('');
    }
  }, [key, empty, invalid, minLength, maxLength]);

  const handleMouseOver = (): void => {
    setHovered(true);
  };

  const handleMouseOut = (): void => {
    setHovered(false);
  };

  return (
    <div className={styles.formError}>
      {errorStr.length > 0 && (
        <>
          <div
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
            className={styles.error}
          >
            !
          </div>
          <div
            className={clsx(
              styles.messageWrapper,
              isHovered ? styles.messageWrapperShow : styles.messageWrapperHide,
            )}
          >
            <div className={styles.message}>{errorStr}</div>
          </div>
        </>
      )}
    </div>
  );
};

export { FormErrors };
