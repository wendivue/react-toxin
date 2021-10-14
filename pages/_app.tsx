import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import 'normalize.css';

import { useStore } from '@/libs/hooks/useStore';
import '@/styles/main.scss';
import '@/libs/DropdownDate/DropdownDate.scss';
import '@/libs/MuiSlider/MuiSlider.scss';
import '@/libs/HotelCard/HotelCard.scss';
import { StoreProvider } from '../storeMobX/context';
import { wrapper } from '../store';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const {
    authStore: { updateUserState },
  } = useStore();

  useEffect(() => {
    updateUserState();
  }, [updateUserState]);

  return <Component {...pageProps} />;
};

const WrappedApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <StoreProvider>
      <App Component={Component} {...pageProps} />
    </StoreProvider>
  );
};

export default wrapper.withRedux(appWithTranslation(WrappedApp));
