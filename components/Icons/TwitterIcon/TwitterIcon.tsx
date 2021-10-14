import React from 'react';

import type { IconProps } from '@/interfaces/IconProps';

const TwitterIcon = ({ className }: IconProps): JSX.Element => (
  <svg className={className} viewBox="0 0 24 20" fill="none">
    <path
      d="M21.5 5.1c1-.7 1.8-1.5 2.5-2.5-.9.4-1.9.6-2.9.7 1-.6 1.8-1.5 2.2-2.7-1 .6-2 1-3.1 1.2a5 5 0 00-8.4 4.5c-4-.2-7.7-2.2-10.2-5.1-.4.7-.6 1.5-.6 2.5 0 1.7.8 3.2 2.2 4-.8 0-1.6-.2-2.3-.6a5 5 0 004 5l-1.3.1h-1c.7 1.9 2.5 3.3 4.7 3.3a9.9 9.9 0 01-7.3 2A13.8 13.8 0 0021.5 5.7v-.6z"
      fill="url(#paint2_linear)"
    />
    <defs>
      <linearGradient
        id="paint2_linear"
        x1="12"
        y1="0"
        x2="12"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#BC9CFF" />
        <stop offset="1" stopColor="#8BA4F9" />
      </linearGradient>
    </defs>
  </svg>
);

export { TwitterIcon };
