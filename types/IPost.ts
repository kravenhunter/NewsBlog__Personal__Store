import type { ICategory, IComment, IFileData } from "~/types";

export default interface IPost {
  id?: string;
  date: number;
  title: string;
  author: string;
  body: string;
  imageBg: IFileData;
  imagePrev: IFileData;
  shortBody: string;
  tags: ICategory[];
  Comment?: IComment[];
}
