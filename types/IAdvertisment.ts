import type { IFileData } from "~/types";

export default interface IAdvertisment {
  id?: string;
  date?: number;
  name?: string;
  source?: IFileData;
}
