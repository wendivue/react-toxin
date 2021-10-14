import React, { FC, useRef } from 'react';
import moment from 'moment';
import { useTranslation } from 'next-i18next';

import { PopUpProps } from '@/BookingCard/PopUp/types';
import { Button } from '@/Button';

import styles from './PopUp.module.scss';

const PopUp: FC<PopUpProps> = (props) => {
  const { t } = useTranslation(['booking', 'filter']);

  const {
    dateFrom,
    dateTo,
    onChange,
    pricePerDay,
    guest = { adults: 1, babies: 0, kids: 0 },
    sale = 0,
    totalPrice,
    additionalServices,
    type,
    roomNumber,
  } = props;

  const from = moment(dateFrom?.toDate());
  const to = moment(dateTo?.toDate());
  const days = moment.duration(to.diff(from)).asDays();
  const wrapper = useRef<HTMLDivElement>(null);

  const handleClick = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target === wrapper.current) {
      onChange();
    }
  };

  let dop = Infinity;
  if (additionalServices) {
    dop = Object.keys(additionalServices).reduce((acc, key) => {
      return (
        acc +
        additionalServices[key].price *
          (guest?.adults + guest?.kids + guest?.babies)
      );
    }, 0);
  }

  return (
    <div
      ref={wrapper}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleClick}
      className={styles.wrapper}
    >
      <div className={styles.popUp}>
        <div className={styles.room}>
          №<span className={styles.numberRoom}>{roomNumber}</span>
          {type !== 'standard' && (
            <span className={styles.typeRoom}>{t(type)}</span>
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.info}>
            <div className={styles.description}>
              {`${t('from')} ${from.format('DD.MM.YYYY')}`} - {`${t('to')} `}
              {to.format('DD.MM.YYYY')}
            </div>
            <div className={styles.price}>
              {days} {t('days', { count: days })}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.description}>
              {pricePerDay.toLocaleString('ru')}₽ {t('pricePerDay')}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.description}>
              {pricePerDay.toLocaleString('ru')}₽ * {days}{' '}
              {t('days', { count: days })}
            </div>
            <div className={styles.price}>
              {(pricePerDay * days).toLocaleString('ru')}₽
            </div>
          </div>
          <div className={styles.additionalServices}>
            <div className={styles.info}>
              <div className={styles.description}>{t('filter:guests')}</div>
            </div>
            <ul className={styles.descriptionList}>
              {guest?.adults && (
                <li className={styles.services}>
                  <span className={styles.servicesDescription}>
                    {t('filter:adults', { count: guest.adults })}
                  </span>
                  {guest.adults}
                </li>
              )}
              {(guest?.kids && (
                <li className={styles.services}>
                  <span className={styles.servicesDescription}>
                    {t('filter:kids', { count: guest.kids })}
                  </span>
                  {guest.kids}
                </li>
              )) ||
                ''}
              {(guest?.babies && (
                <li className={styles.services}>
                  <span className={styles.servicesDescription}>
                    {t('filter:babies', { count: guest.babies })}
                  </span>
                  {guest.babies}
                </li>
              )) ||
                ''}
            </ul>
          </div>
          <div className={styles.info}>
            <div className={styles.description}>{t('sale')}</div>
            <div className={styles.price}>{sale.toLocaleString('ru')}₽</div>
          </div>
          <div className={styles.additionalServices}>
            <div className={styles.info}>
              <div className={styles.description}>
                {t('additionalServices')}
              </div>
              <div className={styles.price}>{dop.toLocaleString('ru')}₽</div>
            </div>
            <ul className={styles.descriptionList}>
              {additionalServices &&
                Object.keys(additionalServices).map((element) => {
                  return (
                    <li key={element} className={styles.services}>
                      <span className={styles.servicesDescription}>
                        {additionalServices[element].description}
                      </span>
                      {additionalServices[element].price}₽
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className={styles.result}>
          <div className={styles.resultName}>{t('total')}</div>
          <div className={styles.totalPrice}>
            {totalPrice.toLocaleString('ru')}₽
          </div>
        </div>
        <Button
          text={t('pay')}
          theme="filled"
          color="white"
          size="m"
          url="/"
          isSubmitButton
        />
      </div>
    </div>
  );
};
export { PopUp };
