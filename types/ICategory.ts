import type { IPost } from "~/types";

export default interface ICategory {
  id?: string;
  title?: string;
  date?: number;
  Posts?: IPost[];
  // FileData:  IFileData[]
}
