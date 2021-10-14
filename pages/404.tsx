import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { NotFound } from '../layouts/NotFound';

export default function PageNotFound(): React.ReactElement {
  return <NotFound />;
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
