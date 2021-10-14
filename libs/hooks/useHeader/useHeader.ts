import { useTranslation } from 'next-i18next';

import { HeaderProps } from '@/Header/types';

import { UseHeader } from './types';

const useHeader: UseHeader = (numberOfActiveLink) => {
  const { t } = useTranslation('navigation');

  const header: HeaderProps = {
    logo: {
      src: '/assets/img/logo-toxin.svg',
    },
    items: [
      {
        text: t('about'),
      },
      {
        text: t('services'),
        more: [
          { text: t('additionalItems') },
          { text: t('additionalItems', { context: 'large' }) },
          { text: t('additionalItems') },
        ],
      },
      { text: t('vacancies') },
      { text: t('news') },
      {
        text: t('agreements'),
        more: [
          { text: t('additionalItems') },
          { text: t('additionalItems', { context: 'large' }) },
          { text: t('additionalItems') },
        ],
      },
    ],
  };

  if (numberOfActiveLink) {
    header.items[numberOfActiveLink].active = true;
  }

  return header;
};

export { useHeader };
