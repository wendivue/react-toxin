import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react-lite';

import { dateToJSON } from 'helpers/timestampJSONFormatter';
import { isDatesMatch } from 'store/rooms/utilities/filterRooms/isDatesMatch';
import {
  countDayForSale,
  millisecondsInDay,
  percentageDiscount,
  priceSetLinen,
} from 'const/costCard';
import { useDropdown } from '@/libs/hooks/useDropdown';
import { useStore } from '@/libs/hooks/useStore';
import { RenderChild } from '@/DropDown/types';
import { DropDown } from '@/DropDown';
import { DropdownDate } from '@/DropdownDate';
import { Button } from '@/Button';
import { WarningPopup } from '@/WarningPopup';
import { SubmitPopup } from '@/SubmitPopup';
import { LoadingPopup } from '@/LoadingPopup';

import styles from './CostCard.module.scss';
import { CostCardProps } from './types';

const { Timestamp } = firebase.firestore;

const CostCard: FC<CostCardProps> = observer(({ roomId }) => {
  const { t } = useTranslation(['booking', 'filter']);

  const {
    authStore: { user },
    bookingStore: { addBooking, bookingError, bookingAddedWithSuccess },
  } = useStore();
  const {
    roomStore: {
      room: roomInfo,
      isLoadingRoomData: roomLoading,
      bookings,
      fetchRoomBooking,
    },
  } = useStore();

  const initialGuestsItems = {
    adults: { value: 0 },
    kids: { value: 0 },
    babies: { value: 0 },
  };

  const {
    price: pricePerDay = Infinity,
    number: roomNumber,
    type: roomTypeKey = 'standard',
  } = roomInfo || {};

  const roomTypes = { standard: '', deluxe: t('deluxe'), lux: t('lux') };

  const [guestsDropdownInfo, setGuestsDropdownItems] = useDropdown(
    'guests',
    initialGuestsItems,
  );

  const [dateFrom, setDateFrom] = useState<number | null>(null);
  const [dateTo, setDateTo] = useState<number | null>(null);

  const [countDay, setCountDay] = useState(1);
  const [sale, setSale] = useState(0);
  const [priceService, setPriceService] = useState(0);
  const [accommodationPrice, setAccommodationPrice] = useState(pricePerDay);

  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [isShowPopup, setShowPopup] = useState(false);
  const [isDatesFree, setIsDatesFree] = useState(true);
  const isValid = useMemo(() => {
    return (
      user &&
      dateTo &&
      dateFrom &&
      guestsDropdownInfo.items.adults.value > 0 &&
      isDatesFree
    );
  }, [
    dateFrom,
    dateTo,
    guestsDropdownInfo.items.adults.value,
    isDatesFree,
    user,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    const { adults, kids, babies } = roomInfo?.guests || {};

    setGuestsDropdownItems({
      adults: {
        maxValue: adults,
        isDisabled: adults === 0,
      },
      kids: {
        maxValue: kids,
        isDisabled: kids === 0,
      },
      babies: {
        maxValue: babies,
        isDisabled: babies === 0,
      },
    });
  }, [roomInfo?.guests]);
  const onDropdownChangeGuest = (guestItems: RenderChild): void => {
    const updatedItems: Record<
      string,
      {
        value?: number;
        maxValue?: number;
        isDisabled?: boolean;
      }
    > = {};

    setPriceService(
      Object.keys(guestItems).reduce((acc, key) => {
        updatedItems[key] = { ...guestItems[key] };
        return acc + guestItems[key].value * priceSetLinen;
      }, 0),
    );
    setGuestsDropdownItems(updatedItems);
  };
  const handlerFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isValid && roomInfo && addBooking) {
      addBooking({
        roomId,
        roomInformation: {
          number: roomInfo.number,
          type: roomInfo.type,
          images: roomInfo.images,
          rating: roomInfo.rating,
          numberOfReviews: roomInfo.numberOfReviews,
        },
        pricePerDay,
        dates: {
          dateFrom: dateToJSON(
            Timestamp.fromDate(
              new Date(dateFrom === null ? 0 : dateFrom) as Date,
            ),
          ),
          dateTo: dateToJSON(
            Timestamp.fromDate(new Date(dateTo === null ? 0 : dateTo) as Date),
          ),
        },
        sale,
        guest: {
          adults: guestsDropdownInfo.items.adults.value,
          kids: guestsDropdownInfo.items.kids.value,
          babies: guestsDropdownInfo.items.babies.value,
        },
        additionalServices: {
          linen: {
            description: `${t('setsUnderwear')}. ${priceSetLinen}₽ ${t(
              'forSet',
            )}`,
            price: priceService,
          },
        },
        totalPrice: accommodationPrice - sale + priceService,
        confirmed: false,
      });
    }
  };

  useEffect(() => {
    fetchRoomBooking(roomId);
  }, [roomId, fetchRoomBooking]);

  const onPopupClick = (): void => {
    setShowPopup((prev) => !prev);
  };

  const onSetDateFrom = (value: Date | null): void => {
    setDateFrom(value && +value);
  };

  const onSetDateTo = (value: Date | null): void => {
    setDateTo(value && +value);
  };

  const onClearDate = (): void => {
    setDateFrom(null);
    setDateTo(null);
  };

  useEffect(() => {
    if (dateTo && dateFrom) {
      setCountDay(Math.abs((dateFrom - dateTo) / millisecondsInDay));
      if (bookings) {
        setIsDatesFree(isDatesMatch(bookings, { dateFrom, dateTo }));
      }
    } else {
      setCountDay(1);
    }
  }, [dateTo, dateFrom, bookings, bookingAddedWithSuccess]);

  useEffect(() => {
    setShowPopup(Boolean(bookingError));
  }, [bookingError]);

  useEffect(() => {
    if (isValid) {
      setIsDisabledBtn(false);
    } else {
      setIsDisabledBtn(true);
    }
  }, [isValid]);

  useEffect(() => {
    setAccommodationPrice(pricePerDay * countDay);
    if (countDay >= countDayForSale) {
      setSale(pricePerDay * countDay * percentageDiscount);
    } else {
      setSale(0);
    }
  }, [countDay, pricePerDay]);

  return (
    <form className={styles.costCard} onSubmit={handlerFormSubmit}>
      {bookingAddedWithSuccess && <SubmitPopup />}
      {roomLoading && <LoadingPopup />}
      <div className={styles.header}>
        <div className={styles.detail}>
          № <div className={styles.roomNumber}>{roomNumber}</div>
          <div className={styles.roomCategory}>{roomTypes[roomTypeKey]}</div>
        </div>
        <div className={styles.price}>
          <div className={styles.priceNumber}>
            {pricePerDay.toLocaleString('ru')}₽
          </div>
          {t('perDay')}
        </div>
      </div>
      <div className={styles.data}>
        <div className={styles.dropdownDate}>
          {!isDatesFree && (
            <div className={styles.errorMessage}>{t('errorMessage')}</div>
          )}
          <DropdownDate
            startValue={dateFrom ? new Date(dateFrom) : null}
            endValue={dateTo ? new Date(dateTo) : null}
            setFrom={onSetDateFrom}
            setTo={onSetDateTo}
            onClear={onClearDate}
          />
        </div>
        <DropDown {...guestsDropdownInfo} onChange={onDropdownChangeGuest} />
      </div>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <div className={styles.text}>
            {pricePerDay.toLocaleString('ru')}₽ х {countDay}{' '}
            {t('days', { count: countDay })}
          </div>
          <div className={styles.text}>
            {accommodationPrice.toLocaleString('ru')}₽
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.text}>
            {t('serviceFree')} {sale.toLocaleString('ru')}₽
          </div>
          <i
            className={styles.icon}
            data-text={`${t('sale')} ${percentageDiscount * 100}% ${t(
              'servicesFroPeriod',
            )} ${countDayForSale} ${t('day', { count: countDayForSale })}.`}
          />
          <div className={styles.text}>0₽</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.text}>{t('additionalServiceFee')}</div>
          <i
            className={styles.icon}
            data-text={`${t('setsLinen')}. ${priceSetLinen.toLocaleString(
              'ru',
            )}₽ ${t('forSet')}`}
          />
          <div className={styles.text}>
            {(priceService * countDay).toLocaleString('ru')}₽
          </div>
        </div>
        <div className={styles.result}>
          <div className={styles.resultName}>{t('total')}</div>
          <div className={styles.totalPrice}>
            {(accommodationPrice - sale + priceService).toLocaleString('ru')}₽
          </div>
        </div>
      </div>
      <div className={styles.button}>
        {user ? (
          <Button
            size="m"
            text={t('makeReservation')}
            theme="filled"
            color="white"
            isDisabled={isDisabledBtn}
            isSubmitButton
          />
        ) : (
          <Button
            size="m"
            text={t('signIn')}
            theme="bordered"
            color="purple"
            url="/auth/signin"
          />
        )}
      </div>
      <WarningPopup isShow={isShowPopup} onClick={onPopupClick} />
    </form>
  );
});

export { CostCard };
