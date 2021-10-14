import React, { FC } from 'react';
import Head from 'next/head';

import { useHeader } from '@/libs/hooks/useHeader/useHeader';
import { Favicon } from '@/Favicon/Favicon';
import { Header } from '@/Header';
import { Footer } from '@/Footer';

import styles from './Main.module.scss';
import { MainProps } from './types';

const Main: FC<MainProps> = ({ title, description, keywords, children }) => {
  const headerProps = useHeader();
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <title>{`${title} | Toxin`}</title>
        <Favicon />
      </Head>
      <div className={styles.main}>
        <div className={styles.content}>
          <Header {...headerProps} />

          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export { Main };
