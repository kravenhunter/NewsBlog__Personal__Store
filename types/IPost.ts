import type { ICategory, IFileData } from "~/types";

export default interface Post {
  id?: string;
  date: number;
  title: string;
  author: string;
  body: string;
  imageBg: IFileData;
  imagePrev: IFileData;
  shortBody: string;
  tags: ICategory[];
  // Comment  : string;
}
