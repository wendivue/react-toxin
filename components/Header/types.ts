import { LogoProps } from '@/Logo/types';
import { MenuElement, Auth } from '@/Header/Menu/types';

type HeaderProps = {
  logo: LogoProps;
  items: Array<MenuElement>;
  auth?: Auth;
};

export type { HeaderProps };
