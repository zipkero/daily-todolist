import date from 'date-and-time';
import ko from 'date-and-time/locale/ko';

const dateFormat = "YYYY-MM-DD";

export const getDateKeyFromDate = (prevDate, format = dateFormat) => {
    return date.format(prevDate, format);
}

export const addDayFromDateKey = (prevDateString, diff) => {
    const prevDate = date.parse(prevDateString, dateFormat);
    return date.format(date.addDays(prevDate, diff), dateFormat);
}

export const getDateFromDateKey = (dateKey, format = dateFormat) => {
    return date.parse(dateKey, format);
}

export const getDisplayDate = (dateKey, format = dateFormat) => {
    return date.format(dateKey, format);
}

export const getDisplayDay = (dateKey, format = "dddd") => {
    date.locale(ko);
    return date.format(dateKey, format);
}