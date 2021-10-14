import React from 'react';

import type { IconProps } from '@/interfaces/IconProps';

const InstagramIcon = ({ className }: IconProps): JSX.Element => (
  <svg className={className} viewBox="0 0 22 22" fill="none">
    <path
      d="M11 5.6c-1 0-1.9.3-2.7.8a5.4 5.4 0 00-2 7.3 6 6 0 002 2 5.5 5.5 0 005.4 0 5.4 5.4 0 00-2.7-10zm0 9c-1 0-1.8-.4-2.5-1.1-.7-.7-1-1.5-1-2.5s.3-1.8 1-2.5 1.5-1 2.5-1 1.8.3 2.5 1 1 1.5 1 2.5-.3 1.8-1 2.5-1.5 1-2.5 1zm6.9-9.2c0 .3-.2.6-.4.9a1 1 0 01-.9.3c-.3 0-.6 0-.9-.3-.2-.3-.3-.6-.3-1 0-.3 0-.6.3-.8.3-.3.6-.4 1-.4.3 0 .6.1.8.4.3.2.4.5.4.9zm3.6 1.2L21 4.3c-.3-.8-.7-1.5-1.3-2-.5-.6-1.2-1-2-1.3A69.7 69.7 0 004.3 1 5.5 5.5 0 001 4.3C.7 5 .6 5.7.5 6.6a139.3 139.3 0 000 8.8l.5 2.3c.3.8.7 1.5 1.2 2 .6.6 1.3 1 2.1 1.3.7.2 1.4.4 2.3.4a72.1 72.1 0 0011.1-.4 5.4 5.4 0 003.3-3.3 72.1 72.1 0 00.4-11zm-2.3 10.6c-.4 1-1 1.6-2 2-.5.2-1.4.3-2.5.4h-4.4a68.3 68.3 0 01-5.5-.4c-1-.4-1.6-1-2-2-.2-.5-.3-1.4-.4-2.5v-4.4a68.4 68.4 0 01.4-5.5c.4-1 1-1.6 2-2 .5-.2 1.4-.3 2.5-.4h4.4a68.4 68.4 0 015.5.4c1 .4 1.6 1 2 2 .2.5.3 1.4.4 2.5v4.4a68.3 68.3 0 01-.4 5.5z"
      fill="url(#paint1_linear)"
    />
    <defs>
      <linearGradient
        id="paint1_linear"
        x1="11"
        y1="-1"
        x2="11"
        y2="23"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#BC9CFF" />
        <stop offset="1" stopColor="#8BA4F9" />
      </linearGradient>
    </defs>
  </svg>
);

export { InstagramIcon };
