import React from 'react';

import { Gear } from '@/Icons/Gear';
import { RecycleBin } from '@/Icons/RecycleBin';

import { UserControlPanelProps } from './types';
import classes from './UserControlPanel.module.scss';

const UserControlPanel: React.FC<UserControlPanelProps> = ({
  onChangeButtonClick,
  onDeleteButtonClick,
}) => (
  <div className={classes.userControlPanel}>
    <button
      onClick={onChangeButtonClick}
      className={classes.button}
      type="button"
    >
      <Gear />
    </button>
    <button
      onClick={onDeleteButtonClick}
      className={classes.button}
      type="button"
    >
      <RecycleBin />
    </button>
  </div>
);

export { UserControlPanel };
