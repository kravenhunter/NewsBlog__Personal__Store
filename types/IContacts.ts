import type { ISocial } from "~/types";

export default interface IContact {
  id?: string;
  copyright?: string;
  phone?: string;
  email?: string;
  adress?: string;
  Socials?: ISocial[];
  date?: number;
}
