import React from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { END } from 'redux-saga';

import { SearchCard } from '@/SearchCard';
import { Main } from 'layouts/Main';
import { SagaStore, wrapper } from 'store';
import { roomsFetchFiltered, roomsSetFilter } from 'store/rooms/roomsActions';

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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query, locale }) => {
    if ((store as SagaStore).sagaTask) {
      store.dispatch(
        roomsSetFilter(JSON.parse((query.filter as string) || '{}')),
      );
      store.dispatch(roomsFetchFiltered());
      store.dispatch(END);
      await (store as SagaStore).sagaTask?.toPromise();
    }

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
  });
