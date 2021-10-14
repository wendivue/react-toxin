import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { DropdownDate } from '@/DropdownDate';
import { DropDown } from '@/DropDown';
import { Button } from '@/Button';
import { WarningPopup } from '@/WarningPopup';
import { RenderChild } from '@/DropDown/types';
import { roomsFetchFiltered, roomsSetFilter } from 'store/rooms/roomsActions';
import { RoomsFilter } from 'store/rooms/roomsTypes';
import { useTypedSelector } from '@/libs/hooks/useTypedSelector';
import { useDropdown } from '@/libs/hooks/useDropdown';
import { getDates } from 'helpers/getDates';

import styles from './SelectionCard.module.scss';

const SelectionCard = React.memo((): JSX.Element => {
  const filter = useTypedSelector((state) => {
    return state.rooms.filter;
  });
  const filterDates = getDates(filter);
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'filter']);
  const [dropdownInfo, setDropdownValues] = useDropdown('guests');
  const [isShowPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const isFieldsBlank =
    filterDates.dateFrom !== null &&
    filterDates.dateTo !== null &&
    filter?.guests?.adults?.value &&
    filter.guests.adults.value > 0;

  const isRoomsError = useTypedSelector((state) => {
    return state.rooms.roomsError;
  });

  const isRoomsLoading = useTypedSelector((state) => {
    return state.rooms.isRoomsLoading;
  });

  const isDisabledButton = !isFieldsBlank || isShowPopup || isRoomsLoading;

  const onSetFrom = (value: Date | null): void => {
    const onSetValue = value && +value;
    if (filterDates.dateFrom !== onSetValue) {
      dispatch(
        roomsSetFilter({
          dates: { dateFrom: onSetValue, dateTo: filterDates.dateTo },
        }),
      );
    }
  };

  const onSetTo = (value: Date | null): void => {
    const onSetValue = value && +value;
    if (filterDates.dateTo !== onSetValue) {
      dispatch(
        roomsSetFilter({
          dates: { dateTo: onSetValue, dateFrom: filterDates.dateFrom },
        }),
      );
    }
  };

  const onClearDropdownDate = (): void => {
    dispatch(
      roomsSetFilter({
        dates: { dateTo: null, dateFrom: null },
      }),
    );
  };

  const onDropdownChange = (guestItems: RenderChild): void => {
    const updatedItems: Record<string, { value: number }> = {};
    Object.keys(guestItems).forEach((key) => {
      updatedItems[key] = { ...guestItems[key] };
    });
    setDropdownValues(updatedItems);
    dispatch(
      roomsSetFilter({
        guests: updatedItems,
      }),
    );
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (!isRoomsError) {
      dispatch(roomsFetchFiltered());
      router.push({
        pathname: '/rooms/search-room',
        query: { filter: JSON.stringify(filter || {}) },
      });
    }
  };

  const onPopupClick = (): void => {
    setShowPopup((prev) => !prev);
  };

  useEffect(() => {
    if (
      filter &&
      filter.guests &&
      JSON.stringify(filter.guests) !== JSON.stringify(dropdownInfo.items)
    ) {
      setDropdownValues(filter.guests);
    }
  }, [filter]);

  useEffect(() => {
    if (filter) {
      const filterString = JSON.stringify(filter);
      if (router.query.filter !== filterString) {
        router.push({ query: { filter: filterString } }, undefined, {
          shallow: true,
        });
      }
    }
  }, [filter]);

  useEffect(() => {
    if (typeof router.query.filter === 'string') {
      const parseQuery = JSON.parse(router.query.filter) as RoomsFilter;
      // eslint-disable-next-line no-prototype-builtins
      if (parseQuery.hasOwnProperty('dates')) {
        const { dates } = parseQuery;
        if (dates) {
          dispatch(
            roomsSetFilter({
              dates: {
                dateFrom: dates.dateFrom && +dates.dateFrom,
                dateTo: dates.dateTo && +dates.dateTo,
              },
            }),
          );
        }
      }
      // eslint-disable-next-line no-prototype-builtins
      if (parseQuery.hasOwnProperty('guests')) {
        const { guests } = parseQuery;
        if (guests) {
          dispatch(
            roomsSetFilter({
              guests,
            }),
          );
        }
      }
    }
  }, [router]);

  useEffect(() => {
    setShowPopup(isRoomsError !== null);
  }, [isRoomsError]);

  return (
    <form className={styles.wrapper} onSubmit={handleFormSubmit}>
      <h1 className={styles.title}>{t('weWillFindRooms')}</h1>
      <div className={styles.dropDate}>
        <DropdownDate
          startValue={
            filterDates.dateFrom ? new Date(filterDates.dateFrom) : null
          }
          endValue={filterDates.dateTo ? new Date(filterDates.dateTo) : null}
          setFrom={onSetFrom}
          setTo={onSetTo}
          onClear={onClearDropdownDate}
        />
      </div>
      <div className={styles.dropdown}>
        <DropDown {...dropdownInfo} onChange={onDropdownChange} />
      </div>
      <Button
        text={t('findRoom')}
        isSubmitButton
        theme="filled"
        color="white"
        size="m"
        isDisabled={isDisabledButton}
      />
      <WarningPopup isShow={isShowPopup} onClick={onPopupClick} />
    </form>
  );
});

export { SelectionCard };
