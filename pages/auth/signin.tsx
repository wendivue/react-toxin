import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Main } from 'layouts/Main';
import { AuthPage } from 'layouts/AuthPage';

export default function SignInPage(): React.ReactElement {
  return (
    <>
      <Main
        title="Sign in"
        description="Авторизация пользователя"
        keywords="войти в аккаунт, авторизация"
      >
        <AuthPage />
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
        'auth',
      ])),
    },
  };
};
