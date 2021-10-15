import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';

import { Button } from '@/Button';
import { TextField } from '@/TextField';
import { FormErrors } from '@/FormError';
import { LoadingPopup } from '@/LoadingPopup';
import { SubmitPopup } from '@/SubmitPopup';
import { useInput } from '@/libs/hooks/useInput/useInput';
import { useTypedSelector } from '@/libs/hooks/useTypedSelector';
import { authUpdateUserPassword } from 'store/auth/authActions';

import styles from './PasswordChangeCard.module.scss';

const PasswordChangeCard = (): JSX.Element => {
  const { t } = useTranslation('auth');

  const [isPasswordChanged, setPasswordChanged] = useState<null | boolean>(
    null,
  );
  const [isBtnPressed, setBtnPressed] = useState(false);
  const oldPassword = useInput('', {});
  const newPassword = useInput('', { isEmpty: true, isPassword: true });
  const newPasswordCopy = useInput('', {});
  const dispatch = useDispatch();
  const store = useTypedSelector((state) => state.auth);
  const isUserLoading = useTypedSelector((state) => {
    return state.auth.isUserLoading;
  });
  const userError = useTypedSelector((state) => {
    return state.auth.userError;
  });

  const isNewPasswordCopyValid =
    newPasswordCopy.value.length > 0 &&
    newPassword.value === newPasswordCopy.value;

  const isOneFieldsNotValid =
    oldPassword.value.length === 0 ||
    !newPassword.isInputValid ||
    !isNewPasswordCopyValid;
  const isDisabledBtn = isOneFieldsNotValid || isUserLoading;

  useEffect(() => {
    const isChangePasswordSuccess =
      store.user && !userError && isPasswordChanged !== null && isBtnPressed;
    if (isChangePasswordSuccess) {
      setPasswordChanged(true);
    } else {
      setPasswordChanged(false);
    }
  }, [store.user, userError, isPasswordChanged, isBtnPressed]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setBtnPressed(true);
    dispatch(
      authUpdateUserPassword({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      {isPasswordChanged && <SubmitPopup />}
      {isUserLoading && <LoadingPopup />}
      <h2 className={styles.title}>{t('changePassword')}</h2>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.oldPasswordWrapper}>
          <p className={styles.description}>{t('oldPassword')}</p>
          <TextField
            type="password"
            name="oldPassword"
            placeholder="Password"
            onChange={oldPassword.onChange}
            inputValue={oldPassword.value}
            onFocus={oldPassword.onFocus}
            onBlur={oldPassword.onBlur}
          />
          {userError !== null && (
            <FormErrors
              formError={{
                changePassword: {
                  invalid: userError !== null,
                },
              }}
            />
          )}
        </div>
        <div className={styles.newPasswordWrapper}>
          <p className={styles.description}>{t('newPassword')}</p>
          <TextField
            type="password"
            name="newPassword"
            placeholder="Password"
            onChange={newPassword.onChange}
            inputValue={newPassword.value}
            onFocus={newPassword.onFocus}
            onBlur={newPassword.onBlur}
          />
          {newPassword.isVisited && (
            <FormErrors
              formError={{
                password: {
                  empty: newPassword.isEmpty,
                  invalid: newPassword.isPasswordError,
                },
              }}
            />
          )}
        </div>
        <div className={styles.newPasswordCopyWrapper}>
          <p className={styles.description}>{t('confirmNewPassword')}</p>
          <TextField
            type="password"
            name="newPasswordCopy"
            placeholder="Password"
            onChange={newPasswordCopy.onChange}
            inputValue={newPasswordCopy.value}
            onBlur={newPasswordCopy.onBlur}
            onFocus={newPasswordCopy.onFocus}
          />
          {newPasswordCopy.isVisited && (
            <FormErrors
              formError={{
                passwordCopy: {
                  invalid: !isNewPasswordCopyValid,
                },
              }}
            />
          )}
        </div>
        <Button
          text={t('saveChanges')}
          theme="filled"
          color="white"
          size="m"
          isSubmitButton
          isDisabled={isDisabledBtn}
        />
      </form>
    </div>
  );
};

export { PasswordChangeCard };
