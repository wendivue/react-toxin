import React, { FC } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import { Button } from '@/Button';
import { Favicon } from '@/Favicon';

import styles from './NotFound.module.scss';

const NotFound: FC = ({ children }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="ошибка, некорректный путь" />
        <meta name="description" content="страница 404" />
        <title>404 | Toxin</title>
        <Favicon />
      </Head>
      <div className={styles.notFound}>
        {t('somethingWentWrong')}
        <Link href="/" passHref>
          <a href="replace">
            <img
              className={styles.img}
              src="/assets/img/404.svg"
              alt="404 page not found"
            />
          </a>
        </Link>
        <div className={styles.button}>
          <Button url="/" text={t('startAgain')} size="m" theme="bordered" />
        </div>
        {children}
      </div>
    </>
  );
};

export { NotFound };
