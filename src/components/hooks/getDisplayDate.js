export default function getDisplayDate(date) {
  const currentDate = new Date(date);
  const YYYY = currentDate.getFullYear();
  let MM = currentDate.getMonth() + 1;
  let DD = currentDate.getDate();
  if (DD < 10) DD = '0' + DD;
  if (MM < 10) MM = '0' + MM;
  const displayDate = DD + '.' + MM + '.' + YYYY;

  return displayDate;
}
