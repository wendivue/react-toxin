import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import styles from './LanguageItem.module.scss';

import { LanguageItemProps } from './types';

const LanguageItem: React.FC<LanguageItemProps> = ({
  flag,
  languageName,
  shortLanguageName,
}) => {
  const { i18n } = useTranslation();
  const isCurrentLanguage = shortLanguageName === i18n.language;

  return (
    <Link href={{}} locale={shortLanguageName}>
      <div className={styles.LanguageItem}>
        <div className={styles.LanguageItemFlag}>{flag}</div>
        <div
          className={clsx(
            styles.LanguageItemName,
            isCurrentLanguage && styles.LanguageItemNameActive,
          )}
        >
          {languageName}
        </div>
      </div>
    </Link>
  );
};

export { LanguageItem };
