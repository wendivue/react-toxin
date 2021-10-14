import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react-lite';

import { Review } from '@/Review';
import { useStore } from '@/libs/hooks/useStore';

import { dateFromJSON } from '../../helpers/timestampJSONFormatter';
import styles from './ReviewList.module.scss';
import { ReviewListProps } from './type';

const ReviewList: FC<ReviewListProps> = observer(
  ({ title, totalReview = 0, reviewList, roomId }) => {
    const { t } = useTranslation('common');
    const {
      authStore: { user },
    } = useStore();

    return (
      <section className={styles.reviews}>
        <div className={styles.wrapperTitle}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.totalText}>
            {totalReview} {t('reviews', { count: totalReview })}
          </p>
        </div>

        <ul className={styles.reviewList}>
          {reviewList.map(
            ({ name, date, text, img, likes, id, userId }, index) => {
              const isControl = userId === user?.firebaseUser.uid;
              return (
                <Review
                  roomId={roomId}
                  isControl={isControl}
                  key={index.toString()}
                  name={name}
                  date={dateFromJSON(date)}
                  text={text}
                  img={img}
                  likes={likes}
                  id={id}
                />
              );
            },
          )}
        </ul>
      </section>
    );
  },
);

export { ReviewList };
