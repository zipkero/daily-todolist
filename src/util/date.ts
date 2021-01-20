// @ts-ignore
import date from "date-and-time";
// @ts-ignore
import ko from "date-and-time/locale/ko";

const dateFormat = "YYYY-MM-DD";

export const getDateKeyFromDate = (
  prevDate: Date,
  format: string = dateFormat
) => {
  return date.format(prevDate, format);
};

export const addDayFromDateKey = (prevDateString: string, diff: number) => {
  const prevDate = date.parse(prevDateString, dateFormat);
  return date.format(date.addDays(prevDate, diff), dateFormat);
};

export const getDateFromDateKey = (
  dateKey: string,
  format: string = dateFormat
) => {
  return date.parse(dateKey, format);
};

export const getDisplayDate = (
  currentDate: Date,
  format: string = dateFormat
) => {
  return date.format(currentDate, format);
};

export const getDisplayDay = (currentDate: Date, format: string = "dddd") => {
  date.locale(ko);
  return date.format(currentDate, format);
};
