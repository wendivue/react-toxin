import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { LogoIcon } from '@/Icons/LogoIcon';
import { useFooter } from '@/libs/hooks/useFooter';

import { FooterNavigation } from './FooterNavigation';
import { SubscribeForm } from './SubscribeForm';
import { SocialList } from './SocialList';
import type { FooterProps } from './type';
import styles from './Footer.module.scss';

const Footer = ({ isTablet = false }: FooterProps): JSX.Element => {
  const {
    navigation,
    subscriptionTitle,
    subscriptionDescription,
    logoDescription,
    copyright,
  } = useFooter();

  return (
    <footer className={clsx(styles.footer, isTablet && styles.footerTablet)}>
      <div
        className={clsx(
          styles.mainWrapper,
          isTablet && styles.mainWrapperTablet,
        )}
      >
        <div className={styles.logoBlock}>
          <div className={styles.logoWrapper}>
            <Link href="/" passHref>
              <a className={styles.mainLink} href="replace">
                <LogoIcon className={styles.icon} />
              </a>
            </Link>
          </div>
          {!isTablet && (
            <p className={styles.logoDescription}>{logoDescription}</p>
          )}
        </div>

        {!isTablet && (
          <>
            {navigation.map((item) => (
              <div className={styles.navBlock} key={item.id}>
                <FooterNavigation linkList={item.payload} title={item.title} />
              </div>
            ))}
            <div className={styles.navBlock}>
              <h3 className={styles.blockTitle}>{subscriptionTitle}</h3>
              <p className={styles.subscribeDescription}>
                {subscriptionDescription}
              </p>
              <div className={styles.form}>
                <SubscribeForm />
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.subWrapperLayout}>
        <div className={styles.subWrapper}>
          <p className={styles.copyright}>{copyright}</p>
          <div className={styles.socials}>
            <SocialList />
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
