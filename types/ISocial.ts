import type { IContacts } from "~/types";

export default interface ISocial {
  id?: string;
  date?: string;
  title?: string;
  link?: string;
  Contact?: IContacts;
}
