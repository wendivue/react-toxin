import React from 'react';
import { GetServerSideProps } from 'next';
import { END } from 'redux-saga';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { roomFetch, roomGetReviews } from 'store/room/roomAction';
import { SagaStore, wrapper } from 'store';
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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { dispatch } = store;
    if ((store as SagaStore).sagaTask) {
      dispatch(roomFetch(ctx.params?.roomId as string));
      dispatch(roomGetReviews({ roomId: ctx.params?.roomId as string }));
      dispatch(END);
      await (store as SagaStore).sagaTask?.toPromise();
    }

    const { roomError } = store.getState().room;
    if (roomError?.message === 'roomData is null') {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale || 'en', [
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
  });
