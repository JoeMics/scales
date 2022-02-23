export function formatDate(date) {
  return new Intl.DateTimeFormat([]).format(date);
}
