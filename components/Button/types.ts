import React from 'react';

type ButtonProps = {
  text: string;
  isArrow?: boolean;
  size?: 's' | 'm' | 'default';
  theme?: 'filled' | 'bordered' | 'default';
  color?: 'grey' | 'purple' | 'white';
  isSubmitButton?: boolean;
  isDisabled?: boolean;
  url?: string;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type { ButtonProps };
