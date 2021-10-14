import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Booking, Bookings } from 'store/booking/bookingTypes';
import { BookingCard } from '@/BookingCard';

import { BookingsFilterType } from './BookingsFilterSwitch/types';
import { BookingsFilterSwitch } from './BookingsFilterSwitch';
import classes from './BookingsList.module.scss';
import { dateFromJSON } from '../../helpers/timestampJSONFormatter';

const BookingsList: React.FC<{ bookings: Bookings | null }> = ({
  bookings,
}) => {
  const { t } = useTranslation('booking');

  const [filter, setFilter] = useState<BookingsFilterType>('all');
  const [filteredBookings, setFilteredBookings] = useState(
    Object.keys(bookings || {}),
  );
  const [confirmedBookingsText, setConfirmedBookingsText] = useState('');

  const handleBookingFilterButtonClick = useCallback(
    (filterType) => setFilter(filterType),
    [],
  );

  const isBookingMatch = useCallback(
    (booking: Booking): boolean => {
      const matchingOnFilters = {
        all: true,
        current:
          dateFromJSON(booking.dates.dateTo).toDate().getTime() >
          new Date().getTime(),
        confirmed: booking.confirmed,
        notConfirmed: !booking.confirmed,
      };
      return matchingOnFilters[filter];
    },
    [filter],
  );

  useEffect(() => {
    const bookingIdList: Array<string> = [];

    Object.entries(bookings || {}).forEach(([bookingId, booking]) => {
      if (isBookingMatch(booking)) {
        bookingIdList.push(bookingId);
      }
    });

    setFilteredBookings(bookingIdList);
  }, [bookings, filter, isBookingMatch]);

  useEffect(() => {
    const bookingsList = Object.values(bookings || {});
    const confirmedBookingsNumber = bookingsList.reduce(
      (accumulator, booking) => accumulator + Number(booking.confirmed),
      0,
    );
    setConfirmedBookingsText(
      `${confirmedBookingsNumber} / ${bookingsList.length}`,
    );
  }, [bookings]);

  return (
    <div className={classes.bookingsList}>
      <h4 className={classes.title}>{t('bookedRooms')}</h4>
      <div className={classes.bookingsFilterSwitchElement}>
        <BookingsFilterSwitch
          currentFilter={filter}
          onChange={handleBookingFilterButtonClick}
        />
      </div>
      <div className={classes.bookings}>
        {filteredBookings.map((bookingId) => (
          <div className={classes.bookingItem} key={bookingId}>
            <BookingCard bookingId={bookingId} />
          </div>
        ))}
      </div>
      <span className={classes.confirmedBookings}>
        {t('bookingsConfirmed')}
        <span className={classes.confirmedBookingsNumber}>
          {confirmedBookingsText}
        </span>
      </span>
    </div>
  );
};

export { BookingsList };
