import type { MultiPartData } from "h3";
import { Buffer } from "node:buffer";
import { randomUUID } from "node:crypto";
import * as fs from "node:fs";
import path from "node:path";

const FILES_KEYS = ["name", "filename", "type", "data"];

// Проверяем содержит ли  объект все ключи FILES_KEYS
export const isFile = (data: MultiPartData) => {
  return Object.keys(data).filter((key) => FILES_KEYS.includes(key)).length === FILES_KEYS.length;
};

export const write_To_File = async (file: MultiPartData): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    if (isFile(file)) {
      const [_mime, ext] = String(file.type).split("/");
      const [name, extension] = String(file.filename).split(".");
      const fileName = `${randomUUID()}_${name}.${extension}`;
      // Формирование пути для  Linux
      const currentPath = path.resolve(path.dirname("./"), "public");
      // const currentPath = path.resolve(path.dirname('./'), 'public', files.file.originalFilename);

      // Для Windows достаточно рутовой дирректории "./" audio
      const publicPath = _mime.includes("audio")
        ? `./public/audio/upload/${fileName}`
        : `./public/images/upload/${fileName}`;

      const array = Buffer.from(file.data.buffer);

      const writeStream = fs.createWriteStream(publicPath);

      writeStream.write(array);
      writeStream.on("error", (error) => {
        const errorStream = fs.createWriteStream(`./public/logs/upload_log.txt`);
        console.log("WriteStream  Error ===", error);
        //Завершаем поток
        writeStream.destroy();
        //Пишем ошибку в лог
        errorStream.write(`Error creating file ${file.filename}`);
      });
      writeStream.end();
      writeStream.on("finish", () => {
        console.log("File written successfully!");
      });

      resolve(fileName);
    } else {
      reject(new Error("File data is null"));
    }
  });
};

export const read_compress_and_write_to_file = async (file: MultiPartData): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    if (isFile(file)) {
      const [_mime, ext] = String(file.type).split("/");
      const currentName = String(file.name).split(".");
      const fileName = `${randomUUID()}_${currentName[0]}.${ext}`;

      const array = Buffer.from(file.data.buffer);

      const readStream = fs.createReadStream(array);
      const writeStream = fs.createWriteStream(`./public/image/upload/${fileName}`);
      //Создаем обработчик ошибок чтения потока
      function hadleErrorRead() {
        const errorStream = fs.createWriteStream(`./public/image/logs/upload_log.txt`);
        //Уничтожаем поток
        readStream.destroy();
        //Завершаем поток
        writeStream.end();
        //Пишем ошибку в лог
        errorStream.write(`Error creating ${fileName}`);
      }
      readStream
        .on("error", hadleErrorRead)
        .pipe(writeStream)
        .on("error", hadleErrorRead)
        .end()
        .on("finish", () => {
          console.log("File written successfully!");
        });

      resolve(fileName);
    } else {
      reject(new Error("File data is null"));
    }
  });
};

const simple_example = () => {
  const buffer = Buffer.from("hello world");
  const writeStream = fs.createWriteStream(`./public/image/upload/file.txt`);
  writeStream.write(buffer);
  writeStream.end();
};
