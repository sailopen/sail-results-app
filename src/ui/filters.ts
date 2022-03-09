export const formatIsoDate = (date: Date | number): string => {
  if (typeof date === 'number')
    return new Date(date).toISOString().substring(0, 10);
  return date.toISOString().substring(0, 10);
};
