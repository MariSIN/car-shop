import Motorcycle from '../Domains/Motorcycle';

export default interface ISuccessResponse {
  (stt: number, obj: Motorcycle | null | (Motorcycle | null)[]): void;
}