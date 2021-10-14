import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { bookingFetch } from 'store/booking/bookingActions';
import {
  authSetAvatar,
  authSetLogin,
  authSignOutRequest,
  authUpdateUserState,
} from 'store/auth/authActions';
import { Firebase } from '@/libs/Firebase';
import { useTypedSelector } from '@/libs/hooks/useTypedSelector';
import { UserCard } from '@/UserCard';
import { PasswordChangeCard } from '@/PasswordChangeCard';
import { DeleteUserCard } from '@/DeleteUserCard';
import { WarningPopup } from '@/WarningPopup';
import { BookingsList } from '@/BookingsList';
import { Button } from '@/Button';
import { Modal } from '@/Modal';
import { Backdrop } from '@/Backdrop';
import { ConfirmPopup } from '@/ConfirmPopup';
import type { UserStatistics } from '@/UserCard/UserStatisticsInfo/types';

import classes from './PersonalAccount.module.scss';

const PersonalAccount: React.FC = React.memo(() => {
  const { t } = useTranslation(['booking', 'auth']);
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isUserLoading, userError } = useTypedSelector(
    (state) => state.auth,
  );
  const { bookings } = useTypedSelector((state) => state.booking);

  const [currentUser, setCurrentUser] = useState(user);

  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isFileExtensionPopupOpen, setIsFileExtensionPopupOpen] =
    useState(false);
  const [isConfirmLogoutPopupOpen, setIsConfirmLogoutPopupOpen] =
    useState(false);

  const [statistics, setStatistics] = useState<UserStatistics>({});

  const handlePasswordChangeOpen = useCallback(
    () => setIsPasswordChangeModalOpen(true),
    [],
  );

  const handlePasswordChangeClose = useCallback(
    () => setIsPasswordChangeModalOpen(false),
    [],
  );

  const handleDeleteAccountOpen = useCallback(
    () => setIsDeleteAccountModalOpen(true),
    [],
  );

  const handleDeleteAccountClose = useCallback(
    () => setIsDeleteAccountModalOpen(false),
    [],
  );

  const handleUserInfoChange = useCallback(
    (userInfo: { name: string; surname: string }) => {
      dispatch(authSetLogin(userInfo));
    },
    [dispatch],
  );

  const handleUserPopupClick = useCallback(() => {
    dispatch(authUpdateUserState());
    setIsUserPopupOpen(false);
  }, [dispatch]);

  const handleFileExtensionPopupClick = useCallback(() => {
    setIsFileExtensionPopupOpen(false);
  }, []);

  const handleAvatarChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (!fileList) return;

      const availableFileTypes = ['png', 'jpg'];
      if (
        !availableFileTypes.includes(fileList[0].name.split('.').pop() || '')
      ) {
        setIsFileExtensionPopupOpen(true);
        return;
      }

      dispatch(authSetAvatar(fileList[0]));
    },
    [dispatch],
  );

  const handleLogoutButtonClick = useCallback(
    () => setIsConfirmLogoutPopupOpen(true),
    [],
  );

  const handleConfirmLogoutPopupSubmit = useCallback(() => {
    dispatch(authSignOutRequest());
    router.replace('/');
  }, [dispatch, router]);

  const handleConfirmLogoutPopupClose = useCallback(
    () => setIsConfirmLogoutPopupOpen(false),
    [],
  );

  useEffect(() => {
    const firebaseApi = new Firebase();
    firebaseApi.getCurrentUser().then((firebaseUser) => {
      if (!firebaseUser) {
        router.back();
      }
    });
  }, [router]);

  useEffect(() => {
    dispatch(bookingFetch());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (userError) {
      setIsUserPopupOpen(true);
    }
  }, [userError]);

  useEffect(() => {
    if (!bookings) return;

    const expensesItems = {
      discount: {
        title: t('sale'),
        value: 0,
      },
      additionalServices: {
        title: t('additionalServices'),
        value: 0,
      },
      accommodation: {
        title: t('accommodation'),
        value: 0,
      },
    };
    Object.values(bookings).forEach((booking) => {
      if (!booking.confirmed) return;

      expensesItems.discount.value += booking.sale;
      Object.values(booking.additionalServices).forEach((service) => {
        expensesItems.additionalServices.value += service.price;
      });
      expensesItems.accommodation.value += booking.totalPrice;
    });
    setStatistics({
      expenses: {
        title: t('expensesForAllTime'),
        items: expensesItems,
      },
    });
  }, [bookings, t]);

  return (
    <div className={classes.personalAccount}>
      {currentUser && (
        <>
          <UserCard
            avatar={currentUser.userInfo.avatar || null}
            name={currentUser.userInfo.name}
            surname={currentUser.userInfo.surname}
            statistics={statistics}
            onAvatarChange={handleAvatarChange}
            onUserInfoChange={handleUserInfoChange}
            onPasswordChange={handlePasswordChangeOpen}
            onDeleteAccount={handleDeleteAccountOpen}
          />
          <Modal
            isVisible={isPasswordChangeModalOpen}
            onClose={handlePasswordChangeClose}
          >
            <PasswordChangeCard />
          </Modal>
          <Modal
            isVisible={isDeleteAccountModalOpen}
            onClose={handleDeleteAccountClose}
          >
            <DeleteUserCard />
          </Modal>
          {isUserLoading && <Backdrop color="light" />}

          <div className={classes.bookingListElement}>
            <BookingsList bookings={bookings} />
          </div>

          <div className={classes.logoutButton}>
            <Button
              text={t('auth:logout')}
              size="m"
              theme="bordered"
              onButtonClick={handleLogoutButtonClick}
            />
          </div>
        </>
      )}
      <WarningPopup onClick={handleUserPopupClick} isShow={isUserPopupOpen} />
      <WarningPopup
        onClick={handleFileExtensionPopupClick}
        isShow={isFileExtensionPopupOpen}
        text={t('auth:fileResolution')}
      />
      <ConfirmPopup
        onSubmit={handleConfirmLogoutPopupSubmit}
        onClose={handleConfirmLogoutPopupClose}
        isVisible={isConfirmLogoutPopupOpen}
        text={t('auth:areSureToLogout')}
      />
    </div>
  );
});

export { PersonalAccount };
