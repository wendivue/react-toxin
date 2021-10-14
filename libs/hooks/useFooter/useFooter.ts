import { useTranslation } from 'next-i18next';

import { UseFooter } from './types';

const useFooter: UseFooter = () => {
  const { t } = useTranslation(['navigation', 'footer']);

  const navigation = [
    {
      id: 1,
      title: t('navigation'),
      payload: [
        { id: '1', src: '/mock-address', label: t('about') },
        { id: '2', src: '/mock-address', label: t('news') },
        { id: '3', src: '/mock-address', label: t('supportService') },
        { id: '4', src: '/mock-address', label: t('services') },
      ],
    },
    {
      id: 2,
      title: t('about'),
      payload: [
        { id: '1', src: '/mock-address', label: t('aboutService') },
        { id: '2', src: '/mock-address', label: t('ourTeam') },
        { id: '3', src: '/mock-address', label: t('vacancies') },
        { id: '4', src: '/mock-address', label: t('investors') },
      ],
    },
    {
      id: 3,
      title: t('supportService'),
      payload: [
        { id: '1', src: '/mock-address', label: t('agreements') },
        { id: '2', src: '/mock-address', label: t('communities') },
        { id: '3', src: '/mock-address', label: t('contactUs') },
      ],
    },
  ];

  return {
    navigation,
    subscriptionTitle: t('footer:subscription'),
    subscriptionDescription: t('footer:subscriptionText'),
    logoDescription: t('footer:toxinText'),
    copyright: t('footer:copyright'),
  };
};

export { useFooter };
