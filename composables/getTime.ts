export function getCurrentTime() {
  const date = new Date();
  const { minutes, seconds, miliseconds } = {
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    miliseconds: date.getMilliseconds(),
  };

  return date.toLocaleTimeString();
}
