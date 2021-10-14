import Link from 'next/link';
import React from 'react';

import styles from './Button.module.scss';
import { ButtonProps } from './types';

const Button = (props: ButtonProps): JSX.Element => {
  const {
    text,
    isArrow = true,
    size = 'default',
    theme = 'default',
    color = 'purple',
    isDisabled = false,
    isSubmitButton = false,
    url,
    onButtonClick,
  } = props;

  const themes = {
    filled: styles.buttonFilled,
    bordered: styles.buttonBordered,
    default: styles.buttonDefault,
  };

  const colors = {
    white: styles.buttonWhite,
    purple: styles.buttonPurple,
    grey: styles.buttonGrey,
  };

  const sizes = {
    m: styles.buttonSizeMedium,
    s: styles.buttonSizeSmall,
    default: styles.buttonSizeDefault,
  };

  let classes = `${styles.button}`;
  if (size) classes += ` ${sizes[size]}`;
  if (theme) classes += ` ${themes[theme]}`;
  if (color) classes += ` ${colors[color]}`;
  if (isSubmitButton && isArrow) classes += ` ${styles.buttonSubmit}`;
  if (url) classes += ` ${styles.buttonLink}`;

  return (
    <>
      {url ? (
        <Link href={url} passHref>
          <a href="replace" className={classes}>
            {text}
          </a>
        </Link>
      ) : (
        <button
          type={isSubmitButton ? 'submit' : 'button'}
          className={classes}
          disabled={isDisabled}
          onClick={onButtonClick}
        >
          {text}
        </button>
      )}
    </>
  );
};

export { Button };
