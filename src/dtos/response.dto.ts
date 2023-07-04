export default class BaseResponse {
  constructor(public message: string,public httpCode: number, public data?: string | any, public status?: string ) {
  }
}