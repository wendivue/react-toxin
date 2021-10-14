import React from 'react';

import { FacebookIcon } from '@/Icons/FacebookIcon';
import { TwitterIcon } from '@/Icons/TwitterIcon';
import { InstagramIcon } from '@/Icons/InstagramIcon';
import styles from './SocialList.module.scss';

const socials = [
  {
    id: 1,
    href: 'https://twitter.com',
    label: 'Twitter',
    icon: <TwitterIcon className={styles.icon} />,
  },
  {
    id: 2,
    href: 'https://facebook.com',
    label: 'Facebook',
    icon: <FacebookIcon className={styles.icon} />,
  },
  {
    id: 3,
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: <InstagramIcon className={styles.icon} />,
  },
];

const SocialList = (): JSX.Element => (
  <ul className={styles.list}>
    {socials.map((item) => (
      <li className={styles.item} key={item.id}>
        <a
          className={styles.link}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={item.label}
        >
          {item.icon}
        </a>
      </li>
    ))}
  </ul>
);

export { SocialList };
