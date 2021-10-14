import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import firebase from 'firebase/app';
import { observer } from 'mobx-react-lite';

import { Button } from '@/Button';
import { useStore } from '@/libs/hooks/useStore';

import { dateToJSON } from '../../helpers/timestampJSONFormatter';
import { ValidationCircle } from './ValidationCircle';
import { CommentCardProps } from './types';
import styles from './CommentCard.module.scss';

const { Timestamp } = firebase.firestore;

const CommentCard: FC<CommentCardProps> = observer(
  ({ roomId, isEdit = false, text = '', onSubmit, reviewId, likes = 0 }) => {
    const { t } = useTranslation('roomInfo');
    const defaultHeightArea = 77;
    const defaultScrollHeight = 36;
    const textArea = useRef<HTMLTextAreaElement | null>(null);
    const [textContent, setTextContent] = useState(text);
    const [textLength, setTextLength] = useState(0);
    const {
      roomStore: { isLoadingReview, setReview, changeReview },
    } = useStore();
    const handleChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>,
    ): void => {
      event.preventDefault();
      if (event.target.value.length > 500) {
        return;
      }
      setTextContent(event.target.value);
      setTextLength(event.target.value.length);
      if (!textArea.current) {
        return;
      }
      if (!textArea.current?.value) {
        textArea.current.style.height = `${defaultHeightArea}px`;
      }
      if (textArea.current.scrollTop > 0) {
        textArea.current.style.height = `${
          textArea.current.scrollHeight + defaultScrollHeight
        }px`;
      }
    };
    const handleFormSubmit = (
      event: React.FormEvent<HTMLFormElement>,
    ): void => {
      event.preventDefault();
      if (!isEdit && textLength >= 5) {
        setReview({
          roomId,
          text: textContent,
          date: dateToJSON(Timestamp.now()),
        });
        setTextContent('');
      } else if (onSubmit && reviewId) {
        onSubmit();

        changeReview({
          roomId,
          text: textContent,
          reviewId,
          likes,
        });
      }
    };
    return (
      <form className={styles.comment} onSubmit={handleFormSubmit}>
        <label className={styles.label}>
          <span className={styles.text}>{!isEdit && t('leaveReview')}</span>
          <textarea
            value={textContent}
            ref={textArea}
            style={{ height: `${defaultHeightArea}px` }}
            onChange={handleChange}
            className={styles.textarea}
            placeholder={t('comment')}
          />
        </label>

        <div className={styles.submit}>
          <div className={styles.button}>
            <Button
              isDisabled={isLoadingReview}
              isSubmitButton
              isArrow={false}
              text={isEdit ? t('changeReview') : t('postReview')}
              color="purple"
              size="m"
              theme="bordered"
            />
          </div>
          <div className={styles.circle}>
            <ValidationCircle value={textLength} />
          </div>
        </div>
      </form>
    );
  },
);

export { CommentCard };
