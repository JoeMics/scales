/**
 * Converts a date object using the browser's locale
 * @param {Date} date - Date object
 * @returns {string} formatted date string
 *
 * @example
 * // returns 3/1/2022
 * formatDate(new Date('March 1,2022'))
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat([]).format(date);
}
