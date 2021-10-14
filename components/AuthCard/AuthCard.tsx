import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Button } from '@/Button';
import { FormErrors } from '@/FormError';
import { useInput } from '@/libs/hooks/useInput/useInput';
import { TextField } from '@/TextField';

import { useTypedSelector } from '@/libs/hooks/useTypedSelector';
import { authSigninRequest } from 'store/auth/authActions';
import { AuthError } from 'store/auth/authTypes';
import styles from './AuthCard.module.scss';

const AuthCard: FC = () => {
  const { t } = useTranslation(['auth', 'common']);

  const dispatch = useDispatch();
  const router = useRouter();
  const store = useTypedSelector((state) => state.auth);
  const isFetching = useTypedSelector((state) => state.auth.isUserLoading);
  const authError: AuthError | null = useTypedSelector(
    (state) => state.auth.userError,
  );
  if (store.user && !authError) {
    router.push('/');
  }
  const email = useInput('', { isEmail: true, isEmpty: true });
  const [password, setPassword] = useState('');
  const isSubmitDisabled =
    !email.isInputValid || isFetching || password.length === 0;

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(authSigninRequest({ email: email.value, password }));
  };

  const handlePasswordChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(evt.target.value);
  };

  return (
    <div className={styles.auth}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.title}>{t('common:login')}</div>
        <div className={styles.field}>
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
          <TextField
            type="password"
            name="password"
            placeholder={t('password')}
            inputValue={password}
            onChange={handlePasswordChange}
          />
          {authError && (
            <FormErrors
              formError={{
                auth: {
                  invalid: true,
                },
              }}
            />
          )}
        </div>
        <div className={styles.submit}>
          <Button
            isSubmitButton
            text={t('common:login')}
            theme="filled"
            color="white"
            size="m"
            isDisabled={isSubmitDisabled}
          />
        </div>
      </form>
      <div className={styles.bot}>
        {t('noAccount')}
        <div className={styles.button}>
          <Button
            size="m"
            text={t('common:create')}
            theme="bordered"
            url="/auth/registration"
          />
        </div>
      </div>
    </div>
  );
};

export { AuthCard };
