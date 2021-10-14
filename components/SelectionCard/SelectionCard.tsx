import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { DropdownDate } from '@/DropdownDate';
import { DropDown } from '@/DropDown';
import { Button } from '@/Button';
import { WarningPopup } from '@/WarningPopup';
import { RenderChild } from '@/DropDown/types';
import { RoomsFilterFirebase } from 'storeMobX/rooms/roomsTypes';
import { useStore } from '@/libs/hooks/useStore';
import { useDropdown } from '@/libs/hooks/useDropdown';

import styles from './SelectionCard.module.scss';

const SelectionCard = observer((): JSX.Element => {
  const {
    roomsStore: {
      filter,
      roomsError,
      isRoomsLoading,
      setFilter,
      fetchFiltered,
    },
  } = useStore();

  const filterDateFrom = filter?.dates?.dateFrom ?? null;
  const filterDateTo = filter?.dates?.dateTo ?? null;
  const filterAdults = filter?.guests?.adults;
  const filterKids = filter?.guests?.kids;
  const filterBabies = filter?.guests?.babies;

  const { t } = useTranslation(['common', 'filter']);
  const [dropdownInfo, setDropdownValues] = useDropdown('guests');
  const [isShowPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const isFieldsBlank =
    filterDateFrom && filterDateTo && filterAdults && filterAdults > 0;

  const isDisabledButton = !isFieldsBlank || isShowPopup || isRoomsLoading;

  const onSetFrom = (value: Date | null): void => {
    const onSetValue = value && +value;
    setFilter({
      dates: { dateFrom: onSetValue, dateTo: filterDateTo },
    });
  };

  const onSetTo = (value: Date | null): void => {
    const onSetValue = value && +value;
    setFilter({
      dates: { dateTo: onSetValue, dateFrom: filterDateFrom },
    });
  };

  const onClearDropdownDate = (): void => {
    setFilter({
      dates: { dateTo: null, dateFrom: null },
    });
  };

  const onDropdownChange = (guestItems: RenderChild): void => {
    const updatedItems: Record<string, { value: number }> = {};
    Object.keys(guestItems).forEach((key) => {
      updatedItems[key] = { ...guestItems[key] };
    });
    setDropdownValues(updatedItems);
    setFilter({
      guests: {
        adults: updatedItems.adults.value ?? 0,
        kids: updatedItems.kids.value ?? 0,
        babies: updatedItems.babies.value ?? 0,
      },
    });
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (!roomsError) {
      fetchFiltered();
      router.push('/rooms/search-room');
    }
  };

  const onPopupClick = (): void => {
    setShowPopup((prev) => !prev);
  };

  useEffect(() => {
    if (typeof router.query.filter === 'string') {
      const parseQuery = JSON.parse(router.query.filter) as RoomsFilterFirebase;

      const { dates, guests } = parseQuery;

      if (dates) {
        setFilter({
          dates: {
            dateFrom: dates.dateFrom && +dates.dateFrom,
            dateTo: dates.dateTo && +dates.dateTo,
          },
        });
      }
      if (guests) {
        setFilter({
          guests: {
            adults: guests.adults,
            kids: guests.kids,
            babies: guests.babies,
          },
        });
      }
    }
  }, [router.query.filter]);

  useEffect(() => {
    const filtered = {
      dates: {
        dateFrom: filterDateFrom,
        dateTo: filterDateTo,
      },
      guests: {
        adults: filterAdults,
        kids: filterKids,
        babies: filterBabies,
      },
    };
    const filterString = JSON.stringify(filtered);
    if (filterString !== router.query.filter) {
      router.push({ query: { filter: filterString } }, undefined, {
        shallow: true,
      });
    }
  }, [filterAdults, filterBabies, filterDateFrom, filterDateTo, filterKids]);

  useEffect(() => {
    setDropdownValues({
      adults: { value: filterAdults },
      kids: { value: filterKids },
      babies: { value: filterBabies },
    });
  }, [filterAdults, filterBabies, filterKids]);

  useEffect(() => {
    setShowPopup(roomsError !== null);
  }, []);

  return (
    <form className={styles.wrapper} onSubmit={handleFormSubmit}>
      <h1 className={styles.title}>{t('weWillFindRooms')}</h1>
      <div className={styles.dropDate}>
        <DropdownDate
          startValue={filterDateFrom ? new Date(filterDateFrom) : null}
          endValue={filterDateTo ? new Date(filterDateTo) : null}
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
