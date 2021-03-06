import React from 'react';

import type { IconProps } from '@/interfaces/IconProps';

const LogoIcon = ({ className }: IconProps): JSX.Element => (
  <svg className={className} viewBox="0 0 106 40" fill="none">
    <path
      d="M62.3 13.4c.2 0 .4.1.5.2.2.1.2.3.2.5s-.1.4-.2.5c-.1.2-.3.2-.5.2h-3.8v10.5c0 .2-.1.4-.2.6-.1.1-.3.2-.5.2s-.4-.1-.5-.2c-.2-.2-.2-.3-.2-.6V14.9h-3.8c-.2 0-.4-.1-.5-.2s-.2-.3-.2-.5.1-.4.2-.5c.2-.2.3-.2.5-.2h9zm6.7 0c1 0 1.7.2 2.5.5s1.5.8 2 1.4c.6.6 1 1.3 1.4 2.1.3.8.5 1.6.5 2.5 0 1-.2 2-.7 2.9s-1 1.6-1.8 2.2h0L71 26l-2 .4c-1 0-1.7-.2-2.5-.5s-1.5-.8-2-1.4c-.6-.6-1-1.3-1.4-2s-.5-1.6-.5-2.5c0-1 .2-1.9.6-2.7s1-1.6 1.6-2.2V15h.1c.6-.5 1.2-.8 2-1.1.7-.3 1.4-.4 2.2-.4zm0 11.4c.4 0 1-.1 1.3-.2.4-.1.8-.3 1.2-.5l-6-7.5c-.4.4-.7.9-1 1.5-.2.5-.3 1.1-.3 1.7 0 .7.1 1.3.4 1.9s.6 1.1 1 1.6c.5.4 1 .8 1.6 1.1s1.2.4 2 .4zm3.6-1.6c.4-.4.7-.9 1-1.5.2-.6.4-1.2.4-1.8 0-.7-.1-1.3-.4-1.9s-.6-1.1-1-1.6-1-.8-1.6-1.1-1.2-.4-2-.4c-.5 0-1 .1-1.3.2-.4.1-.8.3-1.2.5l6.2 7.5zm9.8-2.6c-.2 0-.4-.1-.6-.3l-4.5-5.8c-.1-.2-.2-.3-.2-.5s.1-.4.3-.5.3-.2.5-.1c.2 0 .4.1.5.3l4 5 3.8-4.9c.1-.2.3-.3.5-.3s.4 0 .6.2.3.3.3.5 0 .4-.2.5L83 20.4c-.2.2-.3.3-.6.3zm5 5.6h-.2c-.1 0-.2 0-.3-.1s-.3-.1-.4-.2-.3-.2-.4-.4L82.4 21l-3.8 4.9c-.1.2-.3.3-.5.3s-.4 0-.5-.2-.3-.3-.3-.5 0-.4.2-.6l4.4-5.7c.1-.2.3-.3.6-.3s.5.1.6.3l4 5.3.2.2.1.1c.2 0 .4.1.5.2s.2.3.2.5 0 .4-.2.5-.3.2-.5.2h-.1zm4.3.1c-.2 0-.4-.1-.6-.2s-.2-.3-.2-.6V14.1c0-.2.1-.4.2-.5s.3-.2.6-.2c.2 0 .4.1.5.2s.2.3.2.5v11.4c0 .2-.1.4-.2.6s-.3.2-.5.2zm13.3-.1c-.3 0-.5-.1-.6-.3L97 16.3v9.1c0 .2-.1.4-.2.5s-.3.2-.5.2-.4-.1-.5-.2c-.2-.2-.2-.3-.2-.5V14.1c0-.2 0-.3.1-.4s.2-.2.4-.3.3-.1.5 0 .3.1.4.3l7.3 9.6v-9.2c0-.2.1-.4.2-.5.2-.2.3-.2.5-.2s.4.1.5.2c.2.2.2.3.2.5v11.4c0 .2 0 .3-.1.4s-.2.2-.4.3h-.2z"
      fill="#1f2041"
    />
    <path
      d="M20 27.1c-.6 0-1.2-.5-1.2-1.2 0-4.5-3.7-8.2-8.2-8.2-.6 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2c6 0 10.6 4.7 10.6 10.6 0 .6-.5 1.2-1.2 1.2z"
      fill="url(#A)"
    />
    <path
      d="M30.6 16.5c0 .6-.5 1.2-1.2 1.2-2.8 0-5.3 1.4-6.8 3.6a12 12 0 0 0-1.2-2.3c2-2.2 4.8-3.6 8-3.6.6 0 1.2.5 1.2 1.2z"
      fill="url(#B)"
    />
    <path
      d="M20 40A20 20 0 0 1 0 20 20 20 0 0 1 20 0a20 20 0 0 1 20 20 20 20 0 0 1-20 20zm0-37.6C10.3 2.4 2.4 10.3 2.4 20s8 17.6 17.6 17.6S37.6 29.7 37.6 20 29.7 2.4 20 2.4z"
      fill="url(#C)"
    />
    <defs>
      <linearGradient
        id="A"
        x1="15.3"
        y1="15.3"
        x2="15.3"
        y2="27.1"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#bc9cff" />
        <stop offset="1" stopColor="#8ba4f9" />
      </linearGradient>
      <linearGradient
        id="B"
        x1="26"
        y1="15.3"
        x2="26"
        y2="21.2"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6fcf97" />
        <stop offset="1" stopColor="#66d2ea" />
      </linearGradient>
      <linearGradient
        id="C"
        x1="20"
        y1="0"
        x2="20"
        y2="40"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#bc9cff" />
        <stop offset="1" stopColor="#8ba4f9" />
      </linearGradient>
    </defs>
  </svg>
);

export { LogoIcon };
