export type SuccessResponse = {
  ok?: boolean;
};
export type FailResponse = {
  fail?: boolean;
};

export interface APIResponse extends SuccessResponse, FailResponse {
  payload: any | any[];
}

export const convertLocaleTimezone = (date: Date): Date =>
  new Date(new Date(date).getTime() - 540000);

export const stringLength = (str: string): number => str.length;
