export function getSubtractedDate(date: Date, minutes: number): Date {
  const newDate = new Date(date);
  newDate.setMinutes(date.getMinutes() - minutes);
  return newDate;
}

export function getOneMinuteRange(date: Date): { lt: Date; gte: Date } {
  const gte = new Date(date);
  gte.setSeconds(0);
  gte.setMilliseconds(0);

  const lt = new Date(gte);
  lt.setMinutes(lt.getMinutes() + 1);

  return {
    lt,
    gte,
  };
}
