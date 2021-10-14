import React, { useCallback } from 'react';

import type { UserCardProps } from '@/UserCard/types';
import { UserAvatar } from '@/UserAvatar';
import { Pencil } from '@/Icons/Pencil';

import { UserStatisticsInfo } from './UserStatisticsInfo';
import { UserInfo } from './UserInfo';
import classes from './UserCard.module.scss';
import { UserControlPanel } from './UserControlPanel';

const UserCard: React.FC<UserCardProps> = React.memo(
  ({
    avatar,
    name,
    surname,
    statistics,
    onAvatarChange,
    onUserInfoChange,
    onPasswordChange,
    onDeleteAccount,
  }) => {
    const handleNameChange = useCallback(
      (newName: string) => {
        if (onUserInfoChange) {
          onUserInfoChange({
            name: newName,
            surname,
          });
        }
      },
      [onUserInfoChange, surname],
    );

    const handleSurnameChange = useCallback(
      (newSurname: string) => {
        if (onUserInfoChange) {
          onUserInfoChange({
            name,
            surname: newSurname,
          });
        }
      },
      [onUserInfoChange, name],
    );

    return (
      <div className={classes.userCard}>
        <div className={classes.avatar}>
          <UserAvatar url={avatar} />
          <label className={classes.avatarPencil}>
            <Pencil />
            <input onChange={onAvatarChange} hidden type="file" />
          </label>
        </div>
        <div className={classes.userInfo}>
          <UserInfo
            onNameChange={handleNameChange}
            onSurnameChange={handleSurnameChange}
            name={name}
            surname={surname}
          />
        </div>
        <div className={classes.userStatisticsInfo}>
          <UserStatisticsInfo statistics={statistics} />
        </div>
        <div className={classes.userControlPanel}>
          <UserControlPanel
            onChangeButtonClick={onPasswordChange}
            onDeleteButtonClick={onDeleteAccount}
          />
        </div>
      </div>
    );
  },
);

export { UserCard };
