/**
 * snack types
 */
declare interface Snacks {
  count: number;
  snacks: Snack[];
}

declare interface Snack {
  id: number;
  message: string;
  done: boolean;
  color: AlertColor;
}

declare type SnackActionType = "snack/add" | "snack/update";

declare interface SnackAction {
  id?: number;
  type?: SnackActionType;
  snack?: Snack;
}

/**
 * members types
 */
declare interface User {
  num?: number | null;
  cover?: string | null;
  name?: string | null;
  jumin?: string | null;
  id?: string | null;
  msg?: string | null;
  email?: string | null;
  address?: string | null;
  zip?: number | null;
  gender?: number | null;
  interest?: string | null;
  regdate?: Date | null;
  updates?: Date | null;
}
declare interface KakaoUser {
  num?: number | null;
  cover?: string | null;
  email?: string | null;
  id?: string | null;
  regdate?: Date | null;
}

/**
 * products types
 */
declare interface Product {
  num?: number | null;
  tags?: string | null;
  cover?: string | null;
  address?: string | null;
  view?: number | null;
  type?: string | null;
  id?: string | null;
  title?: string | null;
  content?: string | null;
  capacity?: number | null;
  start?: string | null; // date 변환 필요
  end?: string | null; // date 변환 필요
  until?: string | null; // date 변환 필요
  regdate?: string | null; // date 변환 필요
  updates?: string | null; // date 변환 필요
}

/**
 * products types
 */
declare interface Feedback {
  num?: number | null;
  tags?: string | null;
  view?: number | null;
  author?: string | null;
  title?: string | null;
  content?: string | null;
  regdate?: string | null; // date 변환 필요
  updates?: string | null; // date 변환 필요
}

/**
 * products types
 */
declare interface Comments {
  num?: number | null;
  pnum?: number | null;
  cnum?: number | null;
  order?: number | null;
  layer?: number | null;
  author?: string | null;
  content?: string | null;
  visible?: boolean | null;
  regdate?: Date | null;
}

declare type UserActionType = "user/save" | "user/reset";
declare type ProductActionType = "product/load";
declare type FeedbackActionType = "feedback/load";

declare interface UserAction {
  type?: UserActionType;
  user?: User;
}

declare interface ProductAction {
  type?: ProductActionType;
  products?: Product[];
}

declare interface FeedbackAction {
  type?: FeedbackActionType;
  feedbacks?: Feedback[];
}

declare interface CommentAction {
  type?: CommentActionType;
  comments?: Comments[];
}
