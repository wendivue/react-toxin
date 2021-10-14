import React from 'react';
import { useTranslation } from 'next-i18next';

import { Button } from '@/Button';
import { Modal } from '@/Modal';

import classes from './ConfirmPopup.module.scss';

const ConfirmPopup: React.FC<{
  text: string;
  isVisible: boolean;
  onSubmit: () => void;
  onClose: () => void;
}> = ({ isVisible, onClose, text, onSubmit }) => {
  const { t } = useTranslation('common');

  return isVisible ? (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className={classes.content}>
        <span className={classes.contentText}>{text}</span>
        <div className={classes.buttonWrapper}>
          <Button
            text={t('no')}
            theme="bordered"
            size="s"
            onButtonClick={onClose}
          />
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            text={t('yes')}
            theme="filled"
            color="white"
            size="s"
            onButtonClick={onSubmit}
          />
        </div>
      </div>
    </Modal>
  ) : null;
};

export { ConfirmPopup };
