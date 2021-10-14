import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';

import { useTypedSelector } from '@/libs/hooks/useTypedSelector';
import { Button } from '@/Button';
import { HotelCard } from '@/HotelCard';
import { HotelItemProps } from '@/HotelCard/types';
import { LoadingPopup } from '@/LoadingPopup';
import { bookingDelete, bookingFetch } from 'store/booking/bookingActions';
import { Booking } from 'store/booking/bookingTypes';
import { Room } from 'store/rooms/roomsTypes';

import styles from './BookingCard.module.scss';
import { PopUp } from './PopUp';
import { BookingProps } from './types';
import { dateFromJSON } from '../../helpers/timestampJSONFormatter';

const BookingCard: FC<BookingProps> = ({ bookingId }) => {
  const { t } = useTranslation(['booking']);

  const [isShowDetails, setIsShowDetails] = useState(false);
  const dispatch = useDispatch();

  const userBooking: Partial<Booking> | undefined = useTypedSelector(
    (state) => state.booking.bookings?.[bookingId],
  );
  const userAuth = useTypedSelector((state) => {
    return state.auth.user;
  });
  const {
    roomId,
    dates,
    roomInformation,
    additionalServices,
    guest,
    pricePerDay = 0,
    sale,
    totalPrice,
    confirmed,
  } = userBooking || {};

  const {
    number: roomNumber = 0,
    type = 'standard',
    images = [''],
    rating = 0,
    numberOfReviews,
  } = (roomInformation as Partial<Room>) || {};

  const item: HotelItemProps = {
    sliderList: [...images],
    descriptionList: {
      price: pricePerDay,
      roomNumber,
    },
    link: `/rooms/room-details/${roomId}`,
    review: numberOfReviews,
    isLux: false,
    starList: { rating, disabled: false },
  };

  const handleShowDetails = (): void => {
    setIsShowDetails((s) => !s);
  };

  const handleDeleteBooking = (): void => {
    dispatch(bookingDelete([bookingId, String(roomId)]));
  };

  useEffect(() => {
    dispatch(bookingFetch());
  }, [dispatch, userAuth]);
  return (
    <>
      <div className={styles.booking}>
        {!userBooking && <LoadingPopup />}
        <HotelCard item={item} />
        {userBooking && (
          <>
            <div className={styles.info}>
              <div className={styles.price}>
                <span className={styles.title}>{t('totalPrice')}</span>
                {totalPrice?.toLocaleString('ru')}₽
              </div>
              <div
                className={clsx(styles.icon, confirmed && styles.iconConfirmed)}
              >
                {confirmed ? 'check_circle' : 'cancel'}
                {confirmed ? (
                  <span
                    className={clsx(styles.dropText, styles.dropTextConfirmed)}
                  >
                    {t('bookingConfirmed')}
                  </span>
                ) : (
                  <span className={styles.dropText}>
                    {t('bookingNotConfirmed')}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.buttons}>
              <Button
                text={t('moreDetails')}
                theme="filled"
                color="white"
                onButtonClick={handleShowDetails}
              />
              <Button
                text={t('cancel')}
                theme="bordered"
                color="purple"
                size="m"
                onButtonClick={handleDeleteBooking}
              />
            </div>
          </>
        )}
      </div>

      {isShowDetails && (
        <PopUp
          dateFrom={dateFromJSON(dates?.dateFrom || '{}')}
          dateTo={dateFromJSON(dates?.dateTo || '{}')}
          pricePerDay={pricePerDay}
          onChange={handleShowDetails}
          guest={guest}
          sale={sale || 0}
          type={type}
          roomNumber={roomNumber}
          additionalServices={additionalServices}
          totalPrice={totalPrice || Infinity}
        />
      )}
    </>
  );
};
export { BookingCard };
