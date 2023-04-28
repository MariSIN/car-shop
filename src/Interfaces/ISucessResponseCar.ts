import Car from '../Domains/Car';

export default interface ISuccessResponse {
  (stt: number, obj: Car | null | (Car | null)[]): void;
}