import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Main } from 'layouts/Main';
import { PersonalAccount } from 'layouts/PersonalAccount';

const PersonalAccountPage: React.FC = () => (
  <Main
    title="Personal account"
    description={`Личный кабинет.
                  Изменение данных пользователя.
                  Просмотр и подтверждение забронированных номеров`}
    keywords={`личный кабинет, изменение данных,
               подтверждение забронированных номеров,
               посмотреть забронированные комнаты`}
  >
    <PersonalAccount />
  </Main>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', [
        'common',
        'navigation',
        'footer',
        'booking',
        'auth',
      ])),
    },
  };
};

export default PersonalAccountPage;
