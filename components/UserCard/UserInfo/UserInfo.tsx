import React, { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { UserInfoProps } from '@/UserCard/UserInfo/types';
import { Pencil } from '@/Icons/Pencil';
import { useValidation } from '@/libs/hooks/useValidation/useValidation';
import { FormErrors } from '@/FormError';

import classes from './UserInfo.module.scss';

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  surname,
  onNameChange,
  onSurnameChange,
}) => {
  const { t } = useTranslation('auth');

  const [currentName, setCurrentName] = useState(name);
  const [currentSurname, setCurrentSurname] = useState(surname);

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isSurnameEditing, setIsSurnameEditing] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const surnameInputRef = useRef<HTMLInputElement>(null);

  const nameValidation = useValidation(currentName, {
    minLength: 2,
    isEmpty: true,
    maxLength: 30,
    isUserName: true,
  });

  const surnameValidation = useValidation(currentSurname, {
    minLength: 2,
    isEmpty: true,
    maxLength: 30,
    isUserName: true,
  });

  const handleNameButtonClick = (): void => {
    setIsNameEditing(true);
    nameInputRef.current?.focus();
  };

  const handleSurnameButtonClick = (): void => {
    setIsSurnameEditing(true);
    surnameInputRef.current?.focus();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setCurrentName(event.target.value);

  const handleSurnameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => setCurrentSurname(event.target.value);

  const handleNameInputBlur = (
    event: React.FocusEvent<HTMLInputElement>,
  ): void => {
    if (onNameChange) {
      if (event.target.value !== name && nameValidation.isInputValid) {
        onNameChange(event.target.value);
      } else {
        setCurrentName(name);
      }
    }
    setIsNameEditing(false);
  };

  const handleSurnameInputBlur = (
    event: React.FocusEvent<HTMLInputElement>,
  ): void => {
    if (onSurnameChange) {
      if (event.target.value !== surname && surnameValidation.isInputValid) {
        onSurnameChange(event.target.value);
      } else {
        setCurrentSurname(surname);
      }
    }
    setIsSurnameEditing(false);
  };

  return (
    <div className={classes.userInfo}>
      <h4 className={classes.itemTitle}>{t('name')}</h4>
      <div className={classes.inputWrapper}>
        <input
          onChange={handleNameChange}
          onBlur={handleNameInputBlur}
          ref={nameInputRef}
          value={currentName}
          className={classes.itemValue}
          readOnly={!isNameEditing}
        />
        <FormErrors
          formError={{
            userName: {
              empty: nameValidation.isEmpty,
              minLength: nameValidation.isMinLengthError,
              maxLength: nameValidation.isMaxLengthError,
              invalid: nameValidation.isUserNameError,
            },
          }}
        />
      </div>
      <button
        className={classes.itemPencilButton}
        onClick={handleNameButtonClick}
        type="button"
      >
        <Pencil />
      </button>

      <h4 className={classes.itemTitle}>{t('surname')}</h4>
      <div className={classes.inputWrapper}>
        <input
          onChange={handleSurnameChange}
          onBlur={handleSurnameInputBlur}
          ref={surnameInputRef}
          value={currentSurname}
          className={classes.itemValue}
          readOnly={!isSurnameEditing}
        />
        <FormErrors
          formError={{
            userSurname: {
              empty: surnameValidation.isEmpty,
              minLength: surnameValidation.isMinLengthError,
              maxLength: surnameValidation.isMaxLengthError,
              invalid: surnameValidation.isUserNameError,
            },
          }}
        />
      </div>
      <button
        className={classes.itemPencilButton}
        onClick={handleSurnameButtonClick}
        type="button"
      >
        <Pencil />
      </button>
    </div>
  );
};

export { UserInfo };
