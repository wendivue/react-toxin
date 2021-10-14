import clsx from 'clsx';
import React from 'react';

import { RegistrationCard } from '@/RegistrationCard';
import { AuthCard } from '@/AuthCard';

import styles from './AuthPage.module.scss';
import { AuthPageProps } from './types';

const AuthPage = ({ isRegistration = false }: AuthPageProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div
        className={clsx(
          styles.content,
          isRegistration && styles.contentRegistration,
        )}
      >
        <div className={styles.form}>
          {isRegistration ? <RegistrationCard /> : <AuthCard />}
        </div>
      </div>
    </div>
  );
};

export { AuthPage };
