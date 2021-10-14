import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';

import { useStore } from '@/libs/hooks/useStore';
import { Firebase } from '@/libs/Firebase';
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

const PersonalAccount: React.FC = observer(() => {
  const { t } = useTranslation(['booking', 'auth']);
  const router = useRouter();
  const {
    authStore: {
      user,
      isUserLoading,
      userError,
      updateUserState,
      setLogin,
      setAvatar,
      signOutRequest,
    },
    bookingStore: { bookings, fetchBookings },
  } = useStore();

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
      setLogin(userInfo);
    },
    [setLogin],
  );

  const handleUserPopupClick = useCallback(() => {
    updateUserState();
    setIsUserPopupOpen(false);
  }, [updateUserState]);

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

      setAvatar(fileList[0]);
    },
    [setAvatar],
  );

  const handleLogoutButtonClick = useCallback(
    () => setIsConfirmLogoutPopupOpen(true),
    [],
  );

  const handleConfirmLogoutPopupSubmit = useCallback(() => {
    signOutRequest();
    router.replace('/');
  }, [router, signOutRequest]);

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
    fetchBookings();
  }, [fetchBookings]);

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

  useEffect(
    () =>
      runInAction(() => {
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
      }),
    [bookings, t],
  );

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
