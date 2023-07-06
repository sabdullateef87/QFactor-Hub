import { Request, Response } from "express";
import BaseResponse from '../../dtos/response.dto';
import BaseException from "../../exceptions/BaseException";
import SecurityException from "../../exceptions/SecurityException";
import BadRequestException from "../../exceptions/BadRequestException";
const ExpressAdapter = (fn: Function) => async (req: Request, res: Response) => {
  const object = await fn(req, res);
  switch (object) {
    case BaseResponse:
      return res.status(object.httpCode).json(object);
    case BaseException:
      return res.status(object.httpCode).json(object);
    case SecurityException:
      return res.status(object.httpCode).json(object);
    case BadRequestException:
      return res.status(object.httpCode).json(object);
    default:
      return res.status(object?.httpCode || 200).json(object);
  }
}
export default ExpressAdapter;
