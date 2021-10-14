import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Main } from 'layouts/Main';
import { Banner } from '@/Banner';

export default function Home(): React.ReactElement {
  return (
    <>
      <Main
        title="Pick Room"
        description="Подобрать номер на период проживания"
        keywords="период проживания, номера, даты въезда и выезда"
      >
        <Banner />
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', [
        'common',
        'navigation',
        'footer',
        'filter',
      ])),
    },
  };
};
