import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Main } from 'layouts/Main';
import { RoomDetailsCard } from '@/RoomDetailsCard';

export default function RoomDetails(): React.ReactElement {
  return (
    <>
      <Main
        title="Room details"
        description="Информация о номере: отзывы, рейтинг, удобства"
        keywords="подробная информация о номере, отзывы, рейтинг"
      >
        <RoomDetailsCard />
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
        'diagram',
        'filter',
        'roomInfo',
        'booking',
        'auth',
      ])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
