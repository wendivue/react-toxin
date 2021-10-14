import React, { FC } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { RateButton } from '@/RateButton';

import styles from './HotelCard.module.scss';
import { Slider } from './Slider';
import { HotelCardProps } from './types';

const HotelCard: FC<HotelCardProps> = ({ item, onChange }) => {
  const { t } = useTranslation('common');

  const {
    sliderList,
    descriptionList,
    link,
    starList = {},
    isLux = false,
    review = 0,
    currency = '₽',
    period = ` ${t('perDay').toLowerCase()}`,
  } = item;
  const { roomNumber, price } = descriptionList;
  const { rating, star, disabled } = starList;

  return (
    <div className={styles.card}>
      <Link href={link} passHref>
        <a href="replace">
          <Slider sliderList={sliderList} />
        </a>
      </Link>

      <div className={styles.description}>
        <Link href={link} passHref>
          <a className={styles.link} href="replace">
            <div className={styles.wrapperHead}>
              <p className={styles.roomNumber}>
                №<span className={styles.roomNumberBig}>{roomNumber}</span>
                {isLux && (
                  <span className={styles.roomNumberLux}>{t('lux')}</span>
                )}
              </p>
              <p className={styles.text}>
                <span className={styles.textBold}>
                  {price}
                  {currency}
                </span>
                {period}
              </p>
            </div>
          </a>
        </Link>

        <div className={styles.wrapperReview}>
          <RateButton
            rating={rating}
            star={star}
            disabled={disabled}
            onChange={onChange}
          />

          <p className={`${styles.review} ${styles.text} ${styles.textBig}`}>
            <span className={styles.textBold}>{review}</span>{' '}
            {t('reviews', { count: review })}
          </p>
        </div>
      </div>
    </div>
  );
};

export { HotelCard };
