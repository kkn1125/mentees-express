export const convertLocaleTimezone = (date) => new Date(new Date(date).getTime() - 540000);
export const stringLength = (str) => str.length;
export const objectToQueryString = (obj) => Object.entries(obj).reduce((acc, cur, cid, o) => (acc +=
    cur[0] +
        "=" +
        encodeURIComponent(cur[1]) +
        (cid !== o.length - 1 ? "&" : "")), "");
