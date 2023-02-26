export default class BaseException extends Error {
  constructor(public message: string, public code: number, public status: string) {
    super();
    this.code = code;
    this.status = status;
    this.message = message;
  }
}