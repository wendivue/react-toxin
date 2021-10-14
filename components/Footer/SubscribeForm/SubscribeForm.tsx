import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react-lite';

import { TextField } from '@/TextField';
import { useStore } from '@/libs/hooks/useStore';

import styles from './SubscribeForm.module.scss';
import { SubscribeResultPopup } from './SubscribeResultPopup';

const SubscribeForm = observer((): JSX.Element => {
  const { t } = useTranslation('common');

  const {
    subscriptionStore: { lastEmail, isLoading, error, subscribeEmail },
  } = useStore();

  const [email, setEmail] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);

  const handleEmailChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setEmail(evt.target.value);
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    const emailInput = evt.currentTarget.elements.namedItem('email');
    if (emailInput instanceof HTMLInputElement) {
      subscribeEmail(emailInput.value);
    }

    setEmail('');
  };

  useEffect(() => {
    if (lastEmail) {
      setIsSuccessPopupVisible(true);
      setTimeout(() => setIsSuccessPopupVisible(false), 5000);
    }
  }, [lastEmail]);

  useEffect(() => {
    if (error) {
      setIsErrorPopupVisible(true);
      setTimeout(() => setIsErrorPopupVisible(false), 5000);
    }
  }, [error]);

  useEffect(() => {
    setIsInputDisabled(isLoading);
  }, [isLoading]);

  return (
    <form className={styles.subscribeForm} onSubmit={handleFormSubmit}>
      <TextField
        type="email"
        name="email"
        placeholder="Email"
        isSubscribe
        inputValue={email}
        isDisabled={isInputDisabled}
        onChange={handleEmailChange}
      />
      <SubscribeResultPopup
        text={t('successfullyAddedEmail')}
        isVisible={isSuccessPopupVisible}
        isError={false}
      />
      <SubscribeResultPopup
        text={t('errorOccurred')}
        isVisible={isErrorPopupVisible}
        isError
      />
    </form>
  );
});

export { SubscribeForm };
