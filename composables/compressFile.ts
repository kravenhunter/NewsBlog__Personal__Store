import Compressor from "compressorjs";

export interface IFileObject {
  compressedFILE: File;
  preview: string;
}
export async function compressToBestSize(
  imaageWidth: number,
  fileImage: File,
): Promise<IFileObject | null> {
  const newImage = new Image();
  //Create Blob Link
  newImage.src = URL.createObjectURL(fileImage);

  const ration = imaageWidth / newImage.width;
  const currentHeight = newImage.height * ration;

  const promise = await new Promise((resolve, reject) => {
    const compress = new Compressor(fileImage, {
      quality: 0.1,
      // quality: 0.6,
      width: imaageWidth,
      height: currentHeight,
      mimeType: "image/webp",
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error);
      },
    });
  })
    .then(async (result) => {
      const resultBlob = result as Blob;
      console.log(resultBlob);
      console.log(resultBlob.name);
      console.log(resultBlob.type);
      const newFile = new File([resultBlob], resultBlob.name, { type: resultBlob.type });

      const previewLink = await getPreviewLink(newFile);
      const fileObject: IFileObject = { compressedFILE: newFile, preview: previewLink };

      return fileObject;
    })
    .catch((error) => {
      console.log(error);
      return null;
    })
    .finally(() => {
      console.log("Compress complete");
    });

  return promise;
}
export async function compressToBestSizeImage(fileImage: File) {
  // Kbite
  const sizeImage = fileImage.size / 1024;
  if (sizeImage > 50) {
    try {
      const promise = await new Promise<IFileObject>((resolve, reject) => {
        const compress = new Compressor(fileImage, {
          quality: 0.1,
          // quality: 0.6,
          // The compression process is asynchronous,
          // which means you have to access the `result` in the `success` hook function.
          async success(result) {
            console.log(result);

            const newFile = new File([result], result.name, { type: result.type });
            const previewLink = await getPreviewLink(newFile);
            const fileObject: IFileObject = { compressedFILE: newFile, preview: previewLink };
            resolve(fileObject);

            // const reader = new FileReader();
            // reader.readAsDataURL(newFile);

            // reader.onload = (ev: ProgressEvent<FileReader>) => {
            //    previewLink = ev.target!.result as string;

            //   const fileObject: IFileObject = { compressedFILE: newFile, preview: previewLink };
            //   resolve(fileObject);
            // };

            // The third parameter is required for server
            // formData.append('file', result, result.name);

            // Send the compressed image file to server with XMLHttpRequest.
            // axios.post('/path/to/upload', formData).then(() => {
            //   console.log('Upload success');
            // });
          },
          error(err) {
            console.log(err.message);
            reject(err);
          },
        });
      });

      return promise;
    } catch (error) {
      console.log(error);
      return null;
    }
  } else {
    const previewLink = await getPreviewLink(fileImage);
    return { compressedFILE: fileImage, preview: previewLink };
  }
}

async function getPreviewLink(file: File): Promise<string> {
  const promise = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const previewLink = event.target!.result as string;
      resolve(previewLink);
    };
  });
  return promise;
}

export function customeCompressor() {
  const date = new Date();
  const { minutes, seconds, miliseconds } = {
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    miliseconds: date.getMilliseconds(),
  };

  return date.toLocaleTimeString();
}
