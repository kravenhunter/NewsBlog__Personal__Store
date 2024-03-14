export default (date: number) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);
};
