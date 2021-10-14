type MenuElement = {
  text: string;
  more?: Array<MenuChild>;
  href?: string;
  active?: boolean;
};

type MenuChild = {
  text: string;
  href?: string;
};

type TransitionStyles = {
  [key: string]: { opacity?: number; display?: string };
};

export type { MenuChild, MenuElement, TransitionStyles };
