export default function convertToAudio(base64String: string) {
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);

  let count = 0;
  while (count < binaryString.length) {
    bytes[count] = binaryString.charCodeAt(count);
    count++;
  }

  const blob = new Blob([bytes], { type: "audio/mpeg" });

  return URL.createObjectURL(blob);
}
