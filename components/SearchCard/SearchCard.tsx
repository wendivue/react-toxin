/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react-lite';

import { DropDown } from '@/DropDown';
import { HotelCard } from '@/HotelCard';
import { Pagination } from '@/Pagination';
import { Checkbox } from '@/Checkbox';
import { PriceRange } from '@/PriceRange';
import { SliderValues } from '@/PriceRange/types';
import { DropdownDate } from '@/DropdownDate';
import { RenderChild } from '@/DropDown/types';
import { HotelItemProps } from '@/HotelCard/types';
import { useDropdown } from '@/libs/hooks/useDropdown';
import { useCheckboxes } from '@/libs/hooks/useCheckboxes';
import { AllRooms, RoomsFilterFirebase } from 'storeMobX/rooms/roomsTypes';
import { useStore } from '@/libs/hooks/useStore';

import styles from './SearchCard.module.scss';

const SearchCard: FC = observer(() => {
  const { t } = useTranslation(['common', 'filter']);
  const router = useRouter();
  const {
    roomsStore: {
      filter,
      filteredRooms,
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
  const filterBedrooms = filter?.conveniences?.bedrooms;
  const filterBeds = filter?.conveniences?.beds;
  const filterBathrooms = filter?.conveniences?.bathrooms;
  const filterPriceRange = filter?.priceRange;
  const filterRules = filter?.rules;
  const filterAvailabilities = filter?.availabilities;
  const filterFeatures = filter?.features;

  const [guestsDropdownInfo, setGuestsDropdownValues] = useDropdown('guests');
  const [roomsDropdownInfo, setRoomsDropdownValues] = useDropdown('rooms');

  const [rulesCheckboxesInfo, setRulesCheckboxValues] = useCheckboxes('rules');
  const [availabilitiesCheckboxesInfo, setAvailabilitiesCheckboxValues] =
    useCheckboxes('availabilities');
  const [featuresCheckboxesInfo, setFeaturesCheckboxValues] =
    useCheckboxes('features');

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [cardsSlice, setCardsSlice] = useState<AllRooms | null>(filteredRooms);
  const filteredRoomsLength = filteredRooms
    ? Object.keys(filteredRooms).length
    : 0;

  const onSetFrom = (value: Date | null): void => {
    const onSetValue = value && +value;
    if (filterDateFrom !== onSetValue) {
      setFilter({
        dates: { dateFrom: onSetValue, dateTo: filterDateTo },
      });
    }
  };

  const onSetTo = (value: Date | null): void => {
    const onSetValue = value && +value;
    if (filterDateTo !== onSetValue) {
      setFilter({
        dates: { dateTo: onSetValue, dateFrom: filterDateFrom },
      });
    }
  };

  const onClearDropdownDate = (): void => {
    setFilter({
      dates: { dateTo: null, dateFrom: null },
    });
  };

  const onPriceRangeChange = (value: SliderValues): void => {
    setFilter({
      priceRange: value,
    });
  };

  const onRulesChange = (newValues: boolean[]): void => {
    setRulesCheckboxValues(newValues);
    setFilter({
      rules: {
        smoke: newValues[0],
        pets: newValues[1],
        guests: newValues[2],
      },
    });
  };

  const onAvailabilitiesChange = (newValues: boolean[]): void => {
    setAvailabilitiesCheckboxValues(newValues);
    setFilter({
      availabilities: {
        wideCorridor: newValues[0],
        helpForInvalids: newValues[1],
      },
    });
  };

  const onFeaturesChange = (newValues: boolean[]): void => {
    setFeaturesCheckboxValues(newValues);
    setFilter({
      features: {
        breakfast: newValues[0],
        table: newValues[1],
        feedingChair: newValues[2],
        cot: newValues[3],
        television: newValues[4],
        shampoo: newValues[5],
      },
    });
  };

  const onDropdownChangeGuest = (guestItems: RenderChild): void => {
    const updatedItems: Record<string, { value: number }> = {};
    Object.keys(guestItems).forEach((key) => {
      updatedItems[key] = { ...guestItems[key] };
    });
    setGuestsDropdownValues(updatedItems);
    setFilter({
      guests: {
        adults: updatedItems.adults.value ?? 0,
        kids: updatedItems.kids.value ?? 0,
        babies: updatedItems.babies.value ?? 0,
      },
    });
  };

  const onDropdownChangeRoom = (roomItems: RenderChild): void => {
    const updatedItems: Record<string, { value: number }> = {};
    Object.keys(roomItems).forEach((key) => {
      updatedItems[key] = { ...roomItems[key] };
    });
    setRoomsDropdownValues(updatedItems);
    setFilter({
      conveniences: {
        bedrooms: updatedItems.bedrooms.value ?? 0,
        beds: updatedItems.beds.value ?? 0,
        bathrooms: updatedItems.bathrooms.value ?? 0,
      },
    });
  };

  const createHotelItem = (roomId: string): HotelItemProps | null => {
    if (cardsSlice) {
      const room = cardsSlice[roomId];
      const isLux = room.type === 'lux';
      const item: HotelItemProps = {
        sliderList: room.images,
        descriptionList: {
          price: room.price,
          roomNumber: room.number,
        },
        link: `/rooms/room-details/${roomId}`,
        review: room.numberOfReviews,
        isLux,
        starList: { rating: room.rating, disabled: false },
      };

      return item;
    }
    return null;
  };

  useEffect(() => {
    if (typeof router.query.filter === 'string') {
      const parseQuery = JSON.parse(router.query.filter) as RoomsFilterFirebase;

      const {
        dates,
        guests,
        priceRange,
        rules,
        availabilities,
        conveniences,
        features,
      } = parseQuery;

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

      if (priceRange) {
        setFilter({
          priceRange,
        });
      }

      if (rules) {
        setFilter({
          rules,
        });
      }

      if (availabilities) {
        setFilter({
          availabilities,
        });
      }

      if (conveniences) {
        setFilter({
          conveniences: {
            bedrooms: conveniences.bedrooms,
            beds: conveniences.beds,
            bathrooms: conveniences.bathrooms,
          },
        });
      }

      if (features) {
        setFilter({
          features,
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
      priceRange: filterPriceRange,
      rules: filterRules,
      availabilities: filterAvailabilities,
      conveniences: {
        bedrooms: filterBedrooms,
        beds: filterBeds,
        bathrooms: filterBathrooms,
      },
      features: filterFeatures,
    };

    const filterString = JSON.stringify(filtered);
    if (filterString !== router.query.filter) {
      router.push({ query: { filter: filterString } }, undefined, {
        shallow: true,
      });
    }
  }, [
    filterAdults,
    filterAvailabilities,
    filterBabies,
    filterBathrooms,
    filterBedrooms,
    filterBeds,
    filterDateFrom,
    filterDateTo,
    filterFeatures,
    filterKids,
    filterPriceRange,
    filterRules,
  ]);

  useEffect(() => {
    setGuestsDropdownValues({
      adults: { value: filterAdults },
      kids: { value: filterKids },
      babies: { value: filterBabies },
    });
  }, [filterAdults, filterBabies, filterKids]);

  useEffect(() => {
    setRoomsDropdownValues({
      bedrooms: { value: filterBedrooms },
      beds: { value: filterBeds },
      bathrooms: { value: filterBathrooms },
    });
  }, [filterBathrooms, filterBedrooms, filterBeds]);

  useEffect(() => {
    if (filterRules) {
      setRulesCheckboxValues([
        !!filterRules.smoke,
        !!filterRules.pets,
        !!filterRules.guests,
      ]);
    }
  }, [filterRules]);

  useEffect(() => {
    if (filterAvailabilities) {
      setAvailabilitiesCheckboxValues([
        !!filterAvailabilities.wideCorridor,
        !!filterAvailabilities.helpForInvalids,
      ]);
    }
  }, [filterAvailabilities]);

  useEffect(() => {
    if (filterFeatures) {
      setFeaturesCheckboxValues([
        !!filterFeatures.breakfast,
        !!filterFeatures.table,
        !!filterFeatures.feedingChair,
        !!filterFeatures.cot,
        !!filterFeatures.television,
        !!filterFeatures.shampoo,
      ]);
    }
  }, [filterFeatures]);

  useEffect(() => {
    const limit = 12;
    let end = limit;
    let first = 0;

    if (page > 1) {
      end = limit * page;
      first = end - limit;
      if (filteredRoomsLength === page) end = filteredRoomsLength;
    }

    if (filteredRooms) {
      setCardsSlice(
        Object.fromEntries(
          [...Object.entries(filteredRooms)].slice(first, end),
        ),
      );
    }

    setPageCount(Math.ceil(filteredRoomsLength / 12));
  }, [page, filteredRooms, filteredRoomsLength]);

  useEffect(() => {
    if (router.query.filter !== null) {
      fetchFiltered();
    }
  }, [router.query.filter]);

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <aside className={styles.sidebar}>
          <div className={styles.dropdownDate}>
            <DropdownDate
              startValue={filterDateFrom ? new Date(filterDateFrom) : null}
              endValue={filterDateTo ? new Date(filterDateTo) : null}
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
            {isRoomsLoading && (
              <p className={styles.textLoading}>{t('roomsLoading')}</p>
            )}
            {cardsSlice &&
              !isRoomsLoading &&
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
});

export { SearchCard };
