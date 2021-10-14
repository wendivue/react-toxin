import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react-lite';

import { Button } from '@/Button';
import { FormErrors } from '@/FormError';
import { SubmitPopup } from '@/SubmitPopup';
import { LoadingPopup } from '@/LoadingPopup';
import { TextField } from '@/TextField';
import { useInput } from '@/libs/hooks/useInput/useInput';
import { useStore } from '@/libs/hooks/useStore';

import styles from './DeleteUserCard.module.scss';

const DeleteUserCard = observer((): JSX.Element => {
  const { t } = useTranslation('auth');

  const [isUserDeleted, setUserDeleted] = useState<null | boolean>(null);
  const [password, setPassword] = useState('');
  const email = useInput('', { isEmail: true, isEmpty: true });
  const {
    authStore: { user, isUserLoading, userError, deleteUser },
  } = useStore();

  const router = useRouter();
  const isSubmitDisabled =
    !email.isInputValid || isUserLoading || password.length === 0;

  useEffect(() => {
    const isUserNull = !user && !userError && !isUserLoading;
    if (isUserNull && isUserDeleted !== null) {
      setUserDeleted(true);
    } else {
      setUserDeleted(false);
    }
  }, [userError, isUserLoading, user, isUserDeleted]);

  if (isUserDeleted) {
    router.push('/');
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    deleteUser({ email: email.value, password });
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
});

export { DeleteUserCard };
