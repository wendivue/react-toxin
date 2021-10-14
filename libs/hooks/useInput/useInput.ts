import React, { useState } from 'react';

import { useValidation } from '@/libs/hooks/useValidation/useValidation';

import { UseInputProps } from './types';

const useInput: UseInputProps = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isVisited, setVisited] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const onBlur = (): void => {
    setVisited(true);
  };

  const onFocus = (): void => {
    setVisited(false);
  };

  return {
    value,
    onChange,
    onBlur,
    onFocus,
    isVisited,
    ...valid,
  };
};

export { useInput };
