import type { IUserCredentials } from "~/types";

export default interface IComment {
  id?: string;
  postId?: string;
  date?: number;
  body?: string;
  Author?: IUserCredentials;
  anonumousName?: string;
}
