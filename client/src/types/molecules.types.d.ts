declare type UrlMenuItems = {
  name: string;
  url?: string;
};
declare type HandlerMenuItems = {
  name: string;
  handler?: () => void;
};
declare interface MenuItems extends UrlMenuItems, HandlerMenuItems {
  show?: boolean;
}
