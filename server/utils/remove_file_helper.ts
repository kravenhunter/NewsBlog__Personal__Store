import * as fs from "node:fs";

export const remove_file_from_store = (filePath: string) => {
  fs.unlink(`./public/${filePath}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Файл успешно удален");
  });
};
