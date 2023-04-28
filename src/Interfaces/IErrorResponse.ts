import { Response } from 'express';

export default interface IErrorResponse {
  (stt: number, message: string): Response;
}