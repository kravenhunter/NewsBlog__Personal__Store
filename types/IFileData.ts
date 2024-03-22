import type { ICategory, IUserCredentials } from "~/types";

export default interface IFileData {
  id?: string;
  update_at?: number;
  title?: string;
  file_type?: string;
  file_binary: string;
  adition_binary?: string;
  description: string;
  User?: IUserCredentials;
  category?: ICategory;
}
