import React from 'react';
import MaskedInput from 'react-text-mask';
import { useTranslation } from 'next-i18next';
/* eslint-disable-next-line */
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

import styles from './TextField.module.scss';
import { TextFieldProps } from './types';

const TextField = (props: TextFieldProps): JSX.Element => {
  const { t } = useTranslation('common');

  const {
    type,
    name,
    onChange,
    inputValue,
    placeholder = 'Email',
    isSubscribe = false,
    isWithMask = false,
    isActive = false,
    isDisabled = false,
    onBlur,
    onFocus,
  } = props;

  let labelClasses = `${styles.textField}`;
  let inputClasses = `${styles.input}`;

  if (isSubscribe) {
    labelClasses += ` ${styles.textFieldSubscribe}`;
    inputClasses += ` ${styles.inputSubscribe}`;
  }

  if (isActive) inputClasses += ` ${styles.inputActive}`;

  return (
    <label className={labelClasses}>
      {isWithMask ? (
        <MaskedInput
          mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
          className={inputClasses}
          type="text"
          placeholder={t('dateStructureFull')}
          guide={false}
          name={name}
          pipe={createAutoCorrectedDatePipe('dd/mm/yyyy')}
          disabled={isDisabled}
          onChange={onChange}
          value={inputValue}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      ) : (
        <>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={inputClasses}
            value={inputValue}
            disabled={isDisabled}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          {isSubscribe && (
            <button
              type="submit"
              name="subscribe"
              value="submit"
              className={styles.button}
            >
              arrow_forward
            </button>
          )}
        </>
      )}
    </label>
  );
};

export { TextField };
