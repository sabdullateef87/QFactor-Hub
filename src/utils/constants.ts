export enum Status {
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS"
}

export enum HttpResponseCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  DUPLICATE_RECORD = 409,
  SUCCESS_OK = 200,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500
}

export enum ResponseCode {
  BAD_REQUEST = 91,
  NOT_FOUND = 25,
  DUPLICATE_RECORD = 4,
  UNAUTHORIZED = 63,
  SECURITY_REASON = 63,
  INTERNAL_SERVER_ERROR = 91
}

export enum ResponseMessage {
  NOT_FOUND = "not found"
}