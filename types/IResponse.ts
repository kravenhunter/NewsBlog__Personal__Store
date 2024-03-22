export default interface IResponse {
  statusCode: number;
  statusMessage: string;
  table?: string;
  method?: string;
  objectResult?: any;
}
