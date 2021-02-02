export function stringHHMMSSToDateObject(value: string): Date {
  const [hours, minutes, seconds] = value.split(':');
  const dateObject = new Date();
  dateObject.setHours(+hours);
  dateObject.setMinutes(Number(minutes));
  dateObject.setSeconds(Number(seconds));
  return dateObject;
}
