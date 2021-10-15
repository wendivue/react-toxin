import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Firebase } from '@/libs/Firebase';
import { Button } from '@/Button';
import { FormErrors } from '@/FormError';
import { useInput } from '@/libs/hooks/useInput/useInput';
import { TextField } from '@/TextField';
import { RadioButtons } from '@/RadioButtons';
import { SwitchToggle } from '@/SwitchToggle';
import { useTypedSelector } from '@/libs/hooks/useTypedSelector';
import { authSignupRequest } from 'store/auth/authActions';
import { AuthError } from 'store/auth/authTypes';

import styles from './RegistrationCard.module.scss';
import { dateToJSON } from '../../helpers/timestampJSONFormatter';

const RegistrationCard = (): JSX.Element => {
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
  const password = useInput('', { isPassword: true, isEmpty: true });
  const birthDate = useInput('', { isBirthDate: true, minLength: 10 });
  const name = useInput('', {
    minLength: 2,
    isEmpty: true,
    maxLength: 30,
    isUserName: true,
  });
  const surname = useInput('', {
    minLength: 2,
    isEmpty: true,
    maxLength: 50,
    isUserName: true,
  });
  const [userGender, setUserGender] = useState<0 | 1>(0);
  const [isSubscribed, setSubscribed] = useState(false);
  const [existEmail, setExistEmail] = useState('');
  const isOneFieldsNotValid =
    !email.isInputValid ||
    !password.isInputValid ||
    !birthDate.isInputValid ||
    !name.isInputValid ||
    !surname.isInputValid;
  const isSubmitDisabled = isOneFieldsNotValid || isFetching;
  const isEmailExist = authError && email.value === existEmail;

  const handleFormSubmit = (evt: React.SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(
      authSignupRequest({
        email: email.value,
        password: password.value,
        userInfo: {
          name: name.value,
          surname: surname.value,
          isSubscribed,
          gender: userGender,
          birthday: dateToJSON(Firebase.toTimestamp(new Date(birthDate.value))),
        },
      }),
    );
    setExistEmail(email.value);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h1 className={styles.title}>{t('accountRegistration')}</h1>
        <div className={styles.textFieldName}>
          <TextField
            type="text"
            name="userName"
            inputValue={name.value}
            onChange={name.onChange}
            onBlur={name.onBlur}
            onFocus={name.onFocus}
            placeholder={t('name')}
          />
          {name.isVisited && (
            <FormErrors
              formError={{
                userName: {
                  empty: name.isEmpty,
                  minLength: name.isMinLengthError,
                  maxLength: name.isMaxLengthError,
                  invalid: name.isUserNameError,
                },
              }}
            />
          )}
        </div>
        <div className={styles.textFieldSurname}>
          <TextField
            type="text"
            name="userSurname"
            inputValue={surname.value}
            onChange={surname.onChange}
            onBlur={surname.onBlur}
            onFocus={surname.onFocus}
            placeholder={t('surname')}
          />
          {surname.isVisited && (
            <FormErrors
              formError={{
                userSurname: {
                  empty: surname.isEmpty,
                  minLength: surname.isMinLengthError,
                  maxLength: surname.isMaxLengthError,
                  invalid: name.isUserNameError,
                },
              }}
            />
          )}
        </div>
        <div className={styles.radioWrapper}>
          <RadioButtons
            name="userGender"
            items={[t('male'), t('female')]}
            checkedItem={userGender}
            onChange={setUserGender}
          />
        </div>
        <div />
        <div className={styles.textFieldBirthday}>
          <div className={styles.description}>{t('birthdate')}</div>
          <TextField
            type="text"
            name="birthDate"
            inputValue={birthDate.value}
            onChange={birthDate.onChange}
            onBlur={birthDate.onBlur}
            onFocus={birthDate.onFocus}
            isWithMask
          />
          {birthDate.isVisited && (
            <FormErrors
              formError={{
                birthDate: {
                  empty: birthDate.isEmpty,
                  invalid: birthDate.isBirthDateError,
                  minLength: birthDate.isMinLengthError,
                },
              }}
            />
          )}
        </div>
        <div className={styles.textFieldEmail}>
          <div className={styles.description}>{t('dataForLogging')}</div>
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
          {isEmailExist && (
            <FormErrors
              formError={{
                registration: {
                  invalid: true,
                },
              }}
            />
          )}
        </div>
        <div className={styles.textFieldPassword}>
          <TextField
            type="password"
            name="password"
            placeholder={t('password')}
            inputValue={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
            onFocus={password.onFocus}
          />
          {password.isVisited && (
            <FormErrors
              formError={{
                password: {
                  empty: password.isEmpty,
                  invalid: password.isPasswordError,
                },
              }}
            />
          )}
        </div>
        <div className={styles.toggleWrapper}>
          <SwitchToggle
            label={t('receiveOffers')}
            check={isSubscribed}
            onChange={setSubscribed}
          />
        </div>
        <Button
          text={t('common:signup')}
          isSubmitButton
          theme="filled"
          color="white"
          size="m"
          isDisabled={isSubmitDisabled}
        />
      </form>
      <div className={styles.container}>
        <div className={styles.text}>{t('alreadyHaveAccount')}</div>
        <Button
          theme="bordered"
          size="m"
          text={t('common:login')}
          url="/auth/signin"
        />
      </div>
    </div>
  );
};

export { RegistrationCard };
