export default interface IFormData {
  userName: string;
  emailUser: string;
  password: {
    password: string;
    confirm: string;
  };
}
