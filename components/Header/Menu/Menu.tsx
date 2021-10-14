import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

import { LanguageSelector } from '@/LanguageSelector';
import { MenuItem } from '@/Header/MenuItem';
import { Button } from '@/Button';

import styles from './Menu.module.scss';
import { MenuProps, MenuElement } from './types';

const Menu: FC<MenuProps> = ({ items, auth, showBtn = false }) => {
  const { t } = useTranslation('common');

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (): void => setShowMenu(!showMenu);

  const handleDocument = useCallback(
    (e: MouseEvent): void => {
      let isHave = false;
      if (menuRef.current) {
        isHave = e.composedPath().includes(menuRef.current);
      }

      if (!isHave) {
        setShowMenu(false);
      }
    },
    [menuRef],
  );

  useEffect(() => {
    document.body.addEventListener('click', handleDocument);

    return () => {
      document.body.removeEventListener('click', handleDocument);
    };
  }, []);

  const menuList = items.map(
    ({ more, text, href, active }: MenuElement, ind) => (
      <MenuItem
        key={`menuItem_${ind + 1}`}
        text={text}
        href={href}
        active={active}
        more={more}
      />
    ),
  );
  return (
    <div ref={menuRef} className={styles.menu}>
      <ul className={clsx(styles.items, showMenu && styles.itemsActive)}>
        <button
          type="button"
          className={clsx(styles.close, styles.burger)}
          onClick={handleClick}
        >
          <span className={styles.icon}> close</span>
        </button>

        {menuList}
        <LanguageSelector />

        {showBtn && (
          <>
            <div className={styles.buttonBordered}>
              <Button
                text={t('login')}
                url="/auth/signin"
                theme="bordered"
                size="s"
              />
            </div>
            <div className={styles.button}>
              <Button
                text={t('signup')}
                url="/auth/registration"
                size="s"
                color="white"
                theme="filled"
              />
            </div>
          </>
        )}
      </ul>
      <button type="button" className={styles.burger} onClick={handleClick}>
        <div className={styles.icon}> menu</div>
      </button>

      {!!auth && (
        <div className={styles.auth}>
          <Link href={auth.href || '/'} passHref>
            <a href="replace" className={styles.authLink}>
              {auth.text}
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export { Menu };
