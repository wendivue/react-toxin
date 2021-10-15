import React from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Main } from 'layouts/Main';
import { AuthPage } from 'layouts/AuthPage';
import { wrapper } from '../../store';

export default function RegistrationPage(): React.ReactElement {
  return (
    <>
      <Main
        title="Registration"
        description="Регистрация нового пользователя"
        keywords="регистрация, создать аккаунт"
      >
        <AuthPage isRegistration />
      </Main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(() => async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', [
          'common',
          'navigation',
          'footer',
          'auth',
        ])),
      },
    };
  });
