export default interface CustomError extends Error {
  statusCode: number;
}
