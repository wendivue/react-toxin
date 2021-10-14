import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Main } from 'layouts/Main';
import { SearchCard } from '@/SearchCard';

export default function SearchRoom(): React.ReactElement {
  return (
    <>
      <Main
        title="Search-room"
        description="Подобрать номер на период проживания"
        keywords="период проживания, номера, даты въезда и выезда"
      >
        <SearchCard />
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
