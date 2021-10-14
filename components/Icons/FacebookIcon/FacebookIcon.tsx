import React from 'react';

import type { IconProps } from '@/interfaces/IconProps';

const FacebookIcon = ({ className }: IconProps): JSX.Element => (
  <svg className={className} viewBox="0 0 22 22" fill="none">
    <path
      d="M21.5 2.8v16.4c0 .7-.2 1.2-.7 1.6-.4.5-1 .7-1.6.7h-4v-8.3h2.9l.4-3.2h-3.2V8c0-.5 0-.9.2-1.1.3-.3.7-.4 1.3-.4h1.7V3.6l-2.4-.1a4 4 0 00-3 1.1c-.8.7-1.1 1.8-1.1 3V10H9v3.2H12v8.3H2.7c-.6 0-1.1-.2-1.5-.7-.5-.4-.7-1-.7-1.6V2.9c0-.7.2-1.2.7-1.6.4-.5 1-.7 1.6-.7h16.4c.7 0 1.2.2 1.6.7.5.4.7 1 .7 1.6z"
      fill="url(#paint0_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
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

export { FacebookIcon };
