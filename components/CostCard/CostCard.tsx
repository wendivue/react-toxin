import React, { FC, useEffect, useMemo, useState } from 'react';
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { dateToJSON } from 'helpers/timestampJSONFormatter';
import { RoomsFilter } from 'store/rooms/roomsTypes';
import { isDatesMatch } from 'store/rooms/utilities/filterRooms/isDatesMatch';
import { bookingAdd } from 'store/booking/bookingActions';
import { roomBookingFetch } from 'store/room/roomAction';
import {
  countDayForSale,
  millisecondsInDay,
  percentageDiscount,
  priceSetLinen,
} from 'const/costCard';
import { useTypedSelector } from '@/libs/hooks/useTypedSelector';
import { RenderChild } from '@/DropDown/types';
import { DropDown } from '@/DropDown';
import { DropdownDate } from '@/DropdownDate';
import { Button } from '@/Button';
import { WarningPopup } from '@/WarningPopup';
import { SubmitPopup } from '@/SubmitPopup';
import { LoadingPopup } from '@/LoadingPopup';
import { useDropdown } from '@/libs/hooks/useDropdown';

import styles from './CostCard.module.scss';
import { CostCardProps } from './types';

const { Timestamp } = firebase.firestore;

const CostCard: FC<CostCardProps> = ({ roomId }) => {
  const { t } = useTranslation(['booking', 'filter']);
  const router = useRouter();

  const userAuth = useTypedSelector((state) => {
    return state.auth.user;
  });
  const { bookingsAddedWithSuccess, bookingsError: isBookingAddError } =
    useTypedSelector((state) => {
      return state.booking;
    });

  const {
    room,
    isLoadedRoomData: roomLoading,
    bookings,
  } = useTypedSelector((state) => state.room);
  const roomInfo = useMemo(() => room, []);

  const {
    price: pricePerDay = Infinity,
    number: roomNumber,
    type: roomTypeKey = 'standard',
  } = roomInfo || {};

  const roomTypes = { standard: '', deluxe: t('deluxe'), lux: t('lux') };

  const [guestsDropdownInfo, setGuestsDropdownItems] = useDropdown('guests');

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
      userAuth &&
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
    userAuth,
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
    if (isValid && roomInfo) {
      dispatch(
        bookingAdd({
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
              Timestamp.fromDate(
                new Date(dateTo === null ? 0 : dateTo) as Date,
              ),
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
        }),
      );
    }
  };
  useEffect(() => {
    dispatch(roomBookingFetch(roomId));
  }, []);

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
  }, [dateTo, dateFrom, bookings, bookingsAddedWithSuccess]);

  useEffect(() => {
    setShowPopup(!!isBookingAddError);
  }, [isBookingAddError]);

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

  useEffect(() => {
    const parsedQuery = JSON.parse(
      `${router.query.filter || '{}'}`,
    ) as RoomsFilter;
    const { dates, guests } = parsedQuery;

    if (dates) {
      setDateFrom(dates.dateFrom);
      setDateTo(dates.dateTo);
    }
    if (guests) {
      setGuestsDropdownItems(guests);
    }
  }, [router.query.filter]);

  useEffect(() => {
    const { adults, kids, babies } = guestsDropdownInfo.items;
    const datesDefined = dateFrom && dateTo;
    if (datesDefined) {
      const newFilterQuery = {
        dates: {
          dateFrom,
          dateTo,
        },
        guests: {
          adults,
          kids,
          babies,
        },
      };
      const newFilterString = JSON.stringify(newFilterQuery);

      router.push(
        {
          query: {
            filter: newFilterString,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [dateFrom, dateTo, guestsDropdownInfo.items]);

  return (
    <form className={styles.costCard} onSubmit={handlerFormSubmit}>
      {bookingsAddedWithSuccess && <SubmitPopup />}
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
        {userAuth ? (
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
};
export { CostCard };
