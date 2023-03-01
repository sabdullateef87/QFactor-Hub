export default class MWResponse {
  constructor(public message: string,public httpCode: number, public data: string ) {
  }
}