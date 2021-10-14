import React from 'react';
import { UserStatistics } from './UserStatisticsInfo/types';

type UserCardProps = {
  avatar: string | null;
  name: string;
  surname: string;
  statistics: UserStatistics;
  onAvatarChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUserInfoChange?: (userInfo: { name: string; surname: string }) => void;
  onPasswordChange?: () => void;
  onDeleteAccount?: () => void;
};

export type { UserCardProps };
