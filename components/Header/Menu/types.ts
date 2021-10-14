type MenuProps = {
  items: Array<MenuElement>;
  auth?: Auth;
  showBtn?: boolean;
};
type MenuElement = {
  text: string;
  more?: Array<MenuMore>;
  href?: string;
  active?: boolean;
};
type MenuMore = {
  text: string;
  href?: string;
};
type Auth = {
  text: string;
  href?: string;
};
export type { MenuProps, MenuElement, MenuMore, Auth };
