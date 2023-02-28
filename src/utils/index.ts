import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD ';

export function formatToDateTime(date, format = DATE_TIME_FORMAT): string {
  if (!date) {
    return '-';
  }
  return dayjs(date).format(format);
}

export function formatToDate(date, format = DATE_FORMAT): string {
  if (!date) {
    return '-';
  }
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
