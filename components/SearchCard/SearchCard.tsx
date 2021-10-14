import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';

import { DropDown } from '@/DropDown';
import { HotelCard } from '@/HotelCard';
import { Pagination } from '@/Pagination';
import { Checkbox } from '@/Checkbox';
import { PriceRange } from '@/PriceRange';
import { SliderValues } from '@/PriceRange/types';
import { DropdownDate } from '@/DropdownDate';
import { RenderChild } from '@/DropDown/types';
import { HotelItemProps } from '@/HotelCard/types';
import { useTypedSelector } from '@/libs/hooks/useTypedSelector';
import { useDropdown } from '@/libs/hooks/useDropdown';
import { useCheckboxes } from '@/libs/hooks/useCheckboxes';
import { roomsFetchFiltered, roomsSetFilter } from 'store/rooms/roomsActions';
import { AllRooms, RoomsFilter } from 'store/rooms/roomsTypes';
import { getDates } from 'helpers/getDates';

import styles from './SearchCard.module.scss';

const SearchCard: FC = () => {
  const { t } = useTranslation(['common', 'filter']);
  const router = useRouter();
  const filter = useTypedSelector((state) => {
    return state.rooms.filter;
  });
  const filterDates = getDates(filter);

  const isLoading = useTypedSelector((state) => state.rooms.isRoomsLoading);

  const [guestsDropdownInfo, setGuestsDropdownValues] = useDropdown('guests');
  const [roomsDropdownInfo, setRoomsDropdownValues] = useDropdown('rooms');

  const [rulesCheckboxesInfo, setRulesCheckboxValues] = useCheckboxes('rules');
  const [availabilitiesCheckboxesInfo, setAvailabilitiesCheckboxValues] =
    useCheckboxes('availabilities');
  const [featuresCheckboxesInfo, setFeaturesCheckboxValues] =
    useCheckboxes('features');

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const dispatch = useDispatch();
  const selector = useTypedSelector((state) => state.rooms.filteredRooms);
  const [cardsSlice, setCardsSlice] = useState<AllRooms | null>(selector);
  const selectorLength = selector ? Object.keys(selector).length : 0;

  const onSetFrom = (value: Date | null): void => {
    const onSetValue = value && +value;
    if (filterDates.dateFrom !== onSetValue) {
      dispatch(
        roomsSetFilter({
          dates: { dateFrom: onSetValue, dateTo: filterDates.dateTo },
        }),
      );
      dispatch(roomsFetchFiltered());
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
      dispatch(roomsFetchFiltered());
    }
  };

  const onClearDropdownDate = (): void => {
    dispatch(
      roomsSetFilter({
        dates: { dateTo: null, dateFrom: null },
      }),
    );
    dispatch(roomsFetchFiltered());
  };

  const onPriceRangeChange = (value: SliderValues): void => {
    dispatch(
      roomsSetFilter({
        priceRange: value,
      }),
    );
    dispatch(roomsFetchFiltered());
  };

  const onRulesChange = (newValues: boolean[]): void => {
    setRulesCheckboxValues(newValues);
    dispatch(
      roomsSetFilter({
        rules: {
          smoke: newValues[0],
          pets: newValues[1],
          guests: newValues[2],
        },
      }),
    );
    dispatch(roomsFetchFiltered());
  };

  const onAvailabilitiesChange = (newValues: boolean[]): void => {
    setAvailabilitiesCheckboxValues(newValues);
    dispatch(
      roomsSetFilter({
        availabilities: {
          wideCorridor: newValues[0],
          helpForInvalids: newValues[1],
        },
      }),
    );
    dispatch(roomsFetchFiltered());
  };

  const onFeaturesChange = (newValues: boolean[]): void => {
    setFeaturesCheckboxValues(newValues);
    dispatch(
      roomsSetFilter({
        features: {
          breakfast: newValues[0],
          table: newValues[1],
          feedingChair: newValues[2],
          cot: newValues[3],
          television: newValues[4],
          shampoo: newValues[5],
        },
      }),
    );
    dispatch(roomsFetchFiltered());
  };

  const onDropdownChangeGuest = (guestItems: RenderChild): void => {
    const updatedItems: Record<string, { value: number }> = {};
    Object.keys(guestItems).forEach((key) => {
      updatedItems[key] = { ...guestItems[key] };
    });
    setGuestsDropdownValues(updatedItems);
    dispatch(
      roomsSetFilter({
        guests: updatedItems,
      }),
    );
    dispatch(roomsFetchFiltered());
  };

  const onDropdownChangeRoom = (roomItems: RenderChild): void => {
    const updatedItems: Record<string, { value: number }> = {};
    Object.keys(roomItems).forEach((key) => {
      updatedItems[key] = { ...roomItems[key] };
    });
    setRoomsDropdownValues(updatedItems);
    dispatch(
      roomsSetFilter({
        conveniences: updatedItems,
      }),
    );
    dispatch(roomsFetchFiltered());
  };

  const createHotelItem = (roomId: string): HotelItemProps | null => {
    const { dates, guests } = JSON.parse(
      `${router.query.filter || '{}'}`,
    ) as RoomsFilter;
    const roomQueryFilter = { dates, guests };
    const query = `?filter=${encodeURIComponent(
      JSON.stringify(roomQueryFilter),
    )}`;
    if (cardsSlice) {
      const room = cardsSlice[roomId];
      const isLux = room.type === 'lux';
      const item: HotelItemProps = {
        sliderList: room.images,
        descriptionList: {
          price: room.price,
          roomNumber: room.number,
        },
        link: `/rooms/room-details/${roomId}${query}`,
        review: room.numberOfReviews,
        isLux,
        starList: { rating: room.rating, disabled: false },
      };

      return item;
    }
    return null;
  };

  useEffect(() => {
    if (
      filter?.guests &&
      JSON.stringify(filter.guests) !== JSON.stringify(guestsDropdownInfo.items)
    ) {
      setGuestsDropdownValues(filter.guests);
    }
  }, [filter?.guests]);

  useEffect(() => {
    if (filter?.rules) {
      setRulesCheckboxValues([
        !!filter.rules.smoke,
        !!filter.rules.pets,
        !!filter.rules.guests,
      ]);
    }
  }, [filter?.rules]);

  useEffect(() => {
    if (filter?.availabilities) {
      setAvailabilitiesCheckboxValues([
        !!filter.availabilities.wideCorridor,
        !!filter.availabilities.helpForInvalids,
      ]);
    }
  }, [filter?.availabilities]);

  useEffect(() => {
    if (filter?.features) {
      setFeaturesCheckboxValues([
        !!filter.features.breakfast,
        !!filter.features.table,
        !!filter.features.feedingChair,
        !!filter.features.cot,
        !!filter.features.television,
        !!filter.features.shampoo,
      ]);
    }
  }, [filter?.features]);

  useEffect(() => {
    if (filter?.conveniences) {
      setRoomsDropdownValues(filter.conveniences);
    }
  }, [filter?.conveniences]);

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
      // eslint-disable-next-line no-prototype-builtins
      if (parseQuery.hasOwnProperty('priceRange')) {
        const { priceRange } = parseQuery;
        if (priceRange) {
          dispatch(
            roomsSetFilter({
              priceRange,
            }),
          );
        }
      }
      // eslint-disable-next-line no-prototype-builtins
      if (parseQuery.hasOwnProperty('rules')) {
        const { rules } = parseQuery;
        if (rules) {
          dispatch(
            roomsSetFilter({
              rules,
            }),
          );
        }
      }
      // eslint-disable-next-line no-prototype-builtins
      if (parseQuery.hasOwnProperty('availabilities')) {
        const { availabilities } = parseQuery;
        if (availabilities) {
          dispatch(
            roomsSetFilter({
              availabilities,
            }),
          );
        }
      }
      // eslint-disable-next-line no-prototype-builtins
      if (parseQuery.hasOwnProperty('conveniences')) {
        const { conveniences } = parseQuery;
        if (conveniences) {
          dispatch(
            roomsSetFilter({
              conveniences,
            }),
          );
        }
      }
      // eslint-disable-next-line no-prototype-builtins
      if (parseQuery.hasOwnProperty('features')) {
        const { features } = parseQuery;
        if (features) {
          dispatch(
            roomsSetFilter({
              features,
            }),
          );
        }
      }
    }
  }, [router]);

  useEffect(() => {
    const limit = 12;
    let end = limit;
    let first = 0;

    if (page > 1) {
      end = limit * page;
      first = end - limit;
      if (selectorLength === page) end = selectorLength;
    }

    if (selector) {
      setCardsSlice(
        Object.fromEntries([...Object.entries(selector)].slice(first, end)),
      );
    }

    setPageCount(Math.ceil(selectorLength / 12));
  }, [page, selector, selectorLength]);

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <aside className={styles.sidebar}>
          <div className={styles.dropdownDate}>
            <DropdownDate
              startValue={
                filterDates.dateFrom ? new Date(filterDates.dateFrom) : null
              }
              endValue={
                filterDates.dateTo ? new Date(filterDates.dateTo) : null
              }
              setFrom={onSetFrom}
              setTo={onSetTo}
              onClear={onClearDropdownDate}
              isSingleInput
              startLabelText={t('filter:datesInHotel')}
            />
          </div>
          <div className={styles.dropdownPeople}>
            <DropDown
              {...guestsDropdownInfo}
              onChange={onDropdownChangeGuest}
            />
          </div>
          <div className={styles.range}>
            <PriceRange
              title={t('filter:priceRange')}
              values={filter?.priceRange ? filter.priceRange : [0, 16000]}
              onChange={onPriceRangeChange}
            />
            <p className={styles.textPriceSlider}>{t('filter:pricePerDay')}</p>
          </div>

          <div className={styles.checkboxRule}>
            <Checkbox {...rulesCheckboxesInfo} onChange={onRulesChange} />
          </div>
          <div className={styles.checkboxAvailability}>
            <Checkbox
              {...availabilitiesCheckboxesInfo}
              onChange={onAvailabilitiesChange}
            />
          </div>
          <div className={styles.dropdownRoom}>
            <DropDown {...roomsDropdownInfo} onChange={onDropdownChangeRoom} />
          </div>
          <div className={styles.checkboxAmenities}>
            <Checkbox {...featuresCheckboxesInfo} onChange={onFeaturesChange} />
          </div>
        </aside>

        <article className={styles.content}>
          <h1 className={styles.title}>{t('roomsForYou')}</h1>
          <ul className={styles.cardList}>
            {isLoading && (
              <p className={styles.textLoading}>{t('roomsLoading')}</p>
            )}
            {cardsSlice &&
              Object.keys(cardsSlice).map((roomId) => {
                const item = createHotelItem(roomId);
                if (item) {
                  return (
                    <li key={roomId.toString()} className={styles.card}>
                      <HotelCard item={item} />
                    </li>
                  );
                }
                return null;
              })}
          </ul>

          <div className={styles.pagination}>
            <Pagination
              pagesCount={pageCount}
              onChange={setPage}
              caption={t('roomVariants')}
            />
          </div>
        </article>
      </div>
    </main>
  );
};

export { SearchCard };
