import React from 'react';

type UserControlPanelProps = {
  onChangeButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type { UserControlPanelProps };
