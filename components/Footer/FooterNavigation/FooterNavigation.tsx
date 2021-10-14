import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { useSizes } from '@/libs/hooks/useSizes';
import type { FooterNavigationProps } from './type';
import styles from './FooterNavigation.module.scss';

const TABLET = 1000;

const FooterNavigation = React.memo(
  ({ linkList, title }: FooterNavigationProps): JSX.Element => {
    const [isMenuOpen, setMenuStatus] = useState(false);
    const isTablet = useSizes(TABLET);

    const handleButtonClick = (): void => {
      setMenuStatus((prevStatus) => !prevStatus);
    };

    return (
      <nav className={styles.navigation}>
        <h3 className={styles.title}>
          {isTablet ? (
            <button
              className={styles.button}
              type="button"
              onClick={handleButtonClick}
            >
              {title}
              <span
                className={clsx(styles.icon, isMenuOpen && styles.iconActive)}
              >
                expand_less
              </span>
            </button>
          ) : (
            title
          )}
        </h3>
        <ul className={clsx(styles.list, isMenuOpen && styles.listOpen)}>
          {linkList.map((item) => (
            <li className={styles.item} key={item.id}>
              <Link href={item.src} passHref>
                <a className={styles.link} href="replace">
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  },
);

export { FooterNavigation };
