import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { LogoProps } from './types';
import styles from './Logo.module.scss';

const Logo: React.FC<LogoProps> = ({ src, alt }) => {
  const router = useRouter();
  const handelClick = useCallback(
    (e: React.MouseEvent) => {
      if (router.pathname === '/') {
        e.preventDefault();
      }
    },
    [router],
  );
  return (
    <div className={styles.logo}>
      <Link href="/" passHref>
        <a href="replace" onClick={handelClick} className={styles.logoLink}>
          <img
            src={src || '/assets/img/logo-toxin.svg'}
            alt={alt || 'logo'}
            className={styles.img}
          />
        </a>
      </Link>
    </div>
  );
};

export { Logo };
