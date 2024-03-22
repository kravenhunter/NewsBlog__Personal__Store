export default (event: Event) => {
  const files = (event.target as HTMLInputElement).files;

  return files?.length ? files[0] : null;
};
