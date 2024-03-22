import type { IFileData } from "~/types";

export default interface IUserCredentials {
  id?: string;
  emailField?: string;
  userNameField?: string;
  firstNameField?: string;
  lastNameField?: string;
  phoneField?: string;
  genderField?: string;
  birthdayField?: string;
  adressField?: string;
  accessPanel?: boolean;
  avatarField?: IFileData;
  date?: number;
}
