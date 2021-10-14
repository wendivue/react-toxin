import React, { useEffect } from 'react';
import App, { AppProps, AppContext } from 'next/app';
import { useDispatch } from 'react-redux';
import { appWithTranslation } from 'next-i18next';

import 'normalize.css';
import nookies from 'nookies';

import { wrapper } from 'store';
import {
  authUpdateUserState,
  authUpdateUserStateSuccess,
} from 'store/auth/authActions';
import { AuthProvider } from '@/libs/AuthProvider';

import '../styles/main.scss';
import '../libs/DropdownDate/DropdownDate.scss';
import '../libs/MuiSlider/MuiSlider.scss';
import '../libs/HotelCard/HotelCard.scss';
import {
  bookingFetch,
  bookingFetchSuccess,
} from 'store/booking/bookingActions';

const HOST = `http://${process.env.HOST}`;

function WrappedApp({ Component, pageProps }: AppProps): React.ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookingFetch());
  }, [dispatch]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

WrappedApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (appContext: AppContext) => {
    if (!process.browser) {
      const { ctx } = appContext;
      const { token } = nookies.get(ctx);
      if (token !== undefined) {
        const headers = {
          'Context-Type': 'application/json',
          Authorization: JSON.stringify({ token }),
        };
        try {
          const { user, uid, booking } = await fetch(
            `${HOST}/api/utils/check-user`,
            {
              headers,
            },
          ).then((res) => res.json());
          if (user !== null) {
            store.dispatch(
              authUpdateUserStateSuccess({
                userInfo: user,
                firebaseUser: { uid },
              }),
            );
            store.dispatch(bookingFetchSuccess(booking));
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('_app.getInitialProps error:', error.message);
        }
      }
    }

    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  },
);

export default wrapper.withRedux(appWithTranslation(WrappedApp));
