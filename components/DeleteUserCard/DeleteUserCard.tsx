import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Button } from '@/Button';
import { FormErrors } from '@/FormError';
import { SubmitPopup } from '@/SubmitPopup';
import { LoadingPopup } from '@/LoadingPopup';
import { TextField } from '@/TextField';
import { useInput } from '@/libs/hooks/useInput/useInput';
import { useTypedSelector } from '@/libs/hooks/useTypedSelector';
import { authDeleteUser } from 'store/auth/authActions';

import styles from './DeleteUserCard.module.scss';

const DeleteUserCard = (): JSX.Element => {
  const { t } = useTranslation('auth');

  const [isUserDeleted, setUserDeleted] = useState<null | boolean>(null);
  const [password, setPassword] = useState('');
  const email = useInput('', { isEmail: true, isEmpty: true });
  const dispatch = useDispatch();
  const router = useRouter();
  const store = useTypedSelector((state) => state.auth);
  const isUserLoading = useTypedSelector((state) => state.auth.isUserLoading);
  const userError = useTypedSelector((state) => state.auth.userError);
  const isSubmitDisabled =
    !email.isInputValid || isUserLoading || password.length === 0;

  useEffect(() => {
    const isUserNull = !store.user && !userError && !isUserLoading;
    if (isUserNull && isUserDeleted !== null) {
      setUserDeleted(true);
    } else {
      setUserDeleted(false);
    }
  }, [userError, isUserLoading, store.user, isUserDeleted]);

  if (isUserDeleted) {
    router.push('/');
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(authDeleteUser({ email: email.value, password }));
  };

  const handlePasswordChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(evt.target.value);
  };

  return (
    <div className={styles.wrapper}>
      {isUserDeleted && <SubmitPopup />}
      {isUserLoading && <LoadingPopup />}
      <h2 className={styles.title}>{t('deleteAccount')}</h2>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.field}>
          <p className={styles.description}>email</p>
          <TextField
            type="email"
            name="email"
            inputValue={email.value}
            onChange={email.onChange}
            onBlur={email.onBlur}
            onFocus={email.onFocus}
          />
          {email.isVisited && (
            <FormErrors
              formError={{
                email: {
                  empty: email.isEmpty,
                  invalid: email.isEmailError,
                },
              }}
            />
          )}
        </div>
        <div className={styles.field}>
          <p className={styles.description}>{t('password')}</p>
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            inputValue={password}
            onChange={handlePasswordChange}
          />
          {userError && (
            <FormErrors
              formError={{
                auth: {
                  invalid: true,
                },
              }}
            />
          )}
        </div>
        <Button
          isSubmitButton
          text={t('deleteAccount')}
          theme="bordered"
          size="m"
          isDisabled={isSubmitDisabled}
        />
      </form>
    </div>
  );
};

export { DeleteUserCard };
