/* eslint-disable no-nested-ternary */
import React, { FC } from 'react';

import { Menu } from '@/Header/Menu';
import { Logo } from '@/Logo';
import { useTypedSelector } from '@/libs/hooks/useTypedSelector';

import type { HeaderProps } from './types';
import styles from './Header.module.scss';

const Header: FC<HeaderProps> = ({ logo, items }) => {
  const authUserState = useTypedSelector((state) => state.auth.user);
  const authIsLoadingState = useTypedSelector(
    (state) => state.auth.isUserLoading,
  );

  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <Logo src={logo.src} alt={logo.alt} />
        {authIsLoadingState ? (
          <Menu items={items} />
        ) : authUserState ? (
          <Menu
            items={items}
            auth={{
              // eslint-disable-next-line max-len
              text: `${authUserState.userInfo.name} ${authUserState.userInfo.surname}`,
              href: '/personal-account',
            }}
          />
        ) : (
          <Menu items={items} showBtn />
        )}
      </div>
    </div>
  );
};

export { Header };
