/* eslint-disable no-nested-ternary */
import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { Menu } from '@/Header/Menu';
import { Logo } from '@/Logo';
import { useStore } from '@/libs/hooks/useStore';

import type { HeaderProps } from './types';
import styles from './Header.module.scss';

const Header: FC<HeaderProps> = observer(({ logo, items }) => {
  const {
    authStore: { user, isUserLoading },
  } = useStore();

  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <Logo src={logo.src} alt={logo.alt} />
        {isUserLoading ? (
          <Menu items={items} />
        ) : user ? (
          <Menu
            items={items}
            auth={{
              // eslint-disable-next-line max-len
              text: `${user.userInfo.name} ${user.userInfo.surname}`,
              href: '/personal-account',
            }}
          />
        ) : (
          <Menu items={items} showBtn />
        )}
      </div>
    </div>
  );
});

export { Header };
