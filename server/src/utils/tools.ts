export type SuccessResponse = {
  ok?: boolean;
};
export interface APIResponse extends SuccessResponse {
  payload: any | any[];
}

export const convertLocaleTimezone = (date: Date): Date =>
  new Date(new Date(date).getTime() - 540000);

export const stringLength = (str: string): number => str.length;

export const objectToQueryString = (obj: object): string =>
  Object.entries(obj).reduce(
    (acc, cur, cid, o) =>
      (acc +=
        cur[0] +
        "=" +
        encodeURIComponent(cur[1]) +
        (cid !== o.length - 1 ? "&" : "")),
    ""
  );
