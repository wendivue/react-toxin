import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react-lite';

import { Button } from '@/Button';
import { FormErrors } from '@/FormError';
import { useInput } from '@/libs/hooks/useInput/useInput';
import { TextField } from '@/TextField';
import { useStore } from '@/libs/hooks/useStore';

import styles from './AuthCard.module.scss';

const AuthCard: FC = observer(() => {
  const { t } = useTranslation(['auth', 'common']);
  const {
    authStore: { user, userError, isUserLoading, signinRequest },
  } = useStore();
  const router = useRouter();

  if (user && !userError) {
    router.push('/');
  }
  const email = useInput('', { isEmail: true, isEmpty: true });
  const [password, setPassword] = useState('');
  const isSubmitDisabled =
    !email.isInputValid || isUserLoading || password.length === 0;

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    signinRequest({ email: email.value, password });
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
});

export { AuthCard };
